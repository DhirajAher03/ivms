const express = require('express');
const { addImage, getImage, deleteImage, updateImage,GetuserById } = require('./visit_controller');
const { photoUpload } = require('../fileUpload');

const route = express.Router();

route.post('/addvisit', photoUpload, addImage);
route.get('/getvisit', getImage);
route.get('/getvisitone/:_id', GetuserById);
route.delete('/deletevisit/:_id', deleteImage);
route.put('/updatevisit/:_id', photoUpload, updateImage);

module.exports = route;
