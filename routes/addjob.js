const bcrypt = require("bcryptjs");
const _ = require('lodash');
const { Job, validate } = require('../models/job');
const express = require('express');
const router = express.Router();
 const User = require('../models/user');


// router.get('/:department', function(req, res) {
//     var job = Job.findOne({department:req.params.department}, (err, job) => {
//         if(!err){
//             return res.status(200).send(job);
//         }
//     });

//   });

  router.get('/:role', function(req, res) {
    var job = Job.find({role:req.params.role}, (err, job) => {
        if(!err){
            return res.status(200).send(job);
        }
    });

  });

router.get('/', async (req,res) => {
    
    if(req.query.searchby == null){
        Job.find({}, (err,job) => {
            if(!err){
                return res.status(200).send({data: job});
            }
        });
    }else if(req.query.searchby == 'role'){
        Job.find({role:req.query.role}, (err, job) => {
                     if(!err){
                         return res.status(200).send({data: job});
                     }
        });

    }else if(req.query.searchby == 'department'){
        Job.find({department:req.query.department}, (err, job) => {
            if(!err){
                return res.status(200).send({data: job});
            }
        });
    }

});

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
   let user = await Job.findOne({ qualification:req.body.qualification,salary:req.body.salary,department:req.body.department,experience:req.body.experience,role:req.body.role});
   if (user) {
      return res.status(400).send('That Job already exisits!');
    }
     //if (user) {
        
        // Insert the new user if they do not exist yet
        user = new Job(_.pick(req.body, ['qualification','salary','department','experience','role','referalbonus']));
       // const salt = await bcrypt.genSalt(10);
        //user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(_.pick(user, ['_id','qualification','salary','department','experience','role','referalbonus']));
    
});


 
module.exports = router;