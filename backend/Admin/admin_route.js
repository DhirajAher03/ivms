const {   AdminLogin, AddAdmin } = require ('./admin_controller')
const express = require('express');
const router = express.Router();
const Controller = require('./admin_controller');
const RauthMiddleware = require('../authMiddleware');

const route = express.Router()


// Admin login API
route.post('/adminlogin', AdminLogin);
route.post('/addadmin', AddAdmin);


router.get('/data', RauthMiddleware, (req, res) => {
    // You can access the student ID from `req.student` if needed
    res.json({ msg: 'Protected data for authenticated students', userId: req.user });
});

module.exports= route