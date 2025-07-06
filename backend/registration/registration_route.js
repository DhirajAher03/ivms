const {  Adduser,Login, Getuser, GetuserById, Deleteuser, Updateuser,forgetPassword,sendVerificationEmail } = require ('./registration_controller')
const express = require('express');
const router = express.Router();
const Controller = require('./registration_controller');

const authMiddleware = require('../authMiddleware');

const route = express.Router()

// registration page API
route.post('/add_registration', Adduser);

route.post('/loginauth', Login);

route.get('/get_registration', Getuser);

route.get('/get_registration_one/:_id', GetuserById);

route.delete('/delete_registration/:_id', Deleteuser);

route.put("/forget",forgetPassword);

route.put('/update_registration/:_id', Updateuser);
route.post("/updateemail",sendVerificationEmail);

router.get('/data', authMiddleware, (req, res) => {
    // You can access the student ID from `req.student` if needed
    res.json({ msg: 'Protected data for authenticated students', userId: req.user });
});

module.exports= route