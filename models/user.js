const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    uid: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    usertype: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
            type: Number,
            required: true,
            minlength: 5,
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
     salary:{
            type:Number,
            required:true,
            minlength:5,
            maxlength:15
        },
   
    
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        uid: Joi.string().min(5).max(50).required(),
        phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
        department: Joi.string().min(5).max(50).required(),
        usertype: Joi.string().min(5).max(50).required(),
        role: Joi.string().min(5).max(50).required(),
        salary: Joi.number().integer().min(1000).max(9999999999).required(),
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate = validateUser;