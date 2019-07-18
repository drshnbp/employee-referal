const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('addjob', new mongoose.Schema({
    qualification: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    experience: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    salary: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 10
    },
    department: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    role: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    referalbonus: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 10
    }
    
}));
 
function validateUser(user) {
    const schema = {
        qualification: Joi.string().min(5).max(50).required(),
        salary: Joi.number().integer().min(1000).max(9999999999).required(),
        experience: Joi.string().min(5).max(50).required(),
        department: Joi.string().min(5).max(50).required(),
        role: Joi.string().min(5).max(50).required(),
        referalbonus : Joi.number().integer().min(1).max(999).required()
    };
    return Joi.validate(user, schema);
}
 
exports.Job = User;
exports.validate = validateUser;