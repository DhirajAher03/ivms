const {  Adduser, Getuser, GetuserById, Deleteuser, Updateuser } = require ('./agenda_controller')
const express = require('express');
const router = express.Router();
const Controller = require('./agenda_controller');

const route = express.Router()

// registration page API
route.post('/add_agenda', Adduser);

route.get('/get_agenda', Getuser);

route.get('/get_agenda_one/:_id', GetuserById);

route.delete('/delete_agenda/:_id', Deleteuser);

route.put('/update_agenda/:_id', Updateuser);

module.exports= route