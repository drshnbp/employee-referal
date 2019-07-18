const bcrypt = require("bcryptjs");
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
 


router.get('/:name', function(req, res) {
    var user = User.findOne({name:req.params.name}, (err, user) => {
        if(!err){
            if(user.usertype === "employee")
            {
                return res.status(200).send(user);
            }
            else{
                res.send({
                    message:"User doesnt exist"
                });
            }
        }
        

    });

  });

router.get('/',async (req, res)=>{
    var user = User.find({usertype:"employee"}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }else{
            if(user.length > 1){
                res.status(200).send({data : user});
            }else{
                res.status(200).send({data: "no such document found"});
            }
        }
       
    });
    
    // res.status(200).send(user);
});


router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User(_.pick(req.body, ['name', 'email', 'password','uid','usertype','phone','department','role','salary']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(_.pick(user, ['_id','name', 'email', 'password','uid','usertype','phone','department','role','salary']));
    }
});
 
module.exports = router;