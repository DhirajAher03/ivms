const express = require('express');
const { addImage, getImage, deleteImage, updateImage } = require('./gallery_controller');
const { photoUpload1 } = require('../fileUpload');

const route = express.Router();

route.post('/addgallery', photoUpload1, addImage);
route.get('/getgallery', getImage);
route.delete('/deletegallery/:_id', deleteImage);
route.put('/updategallery/:_id', photoUpload1, updateImage);

module.exports = route;
