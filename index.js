const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const addjob = require('./routes/addjob');
const app = express();
 
mongoose.connect('mongodb+srv://darshan:darshan@cluster0-xhljx.mongodb.net/employee_referals?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
 
app.use(express.json());
app.use('/api/users/', users);
app.use('/auth', auth);
app.use('/api/job',addjob);
 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
