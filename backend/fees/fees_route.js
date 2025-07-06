const {  Adduser, Getuser, GetuserById, Deleteuser, Updateuser } = require ('./fees_controller')
const express = require('express');
const router = express.Router();
const Controller = require('./fees_controller');

const route = express.Router()

// registration page API
route.post('/add_fees', Adduser);

route.get('/get_fees', Getuser);

route.get('/get_fees_one/:_id', GetuserById);

route.delete('/delete_fees/:_id', Deleteuser);

route.put('/update_fees/:_id', Updateuser);

module.exports= route