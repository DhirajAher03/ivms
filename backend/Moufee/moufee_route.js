const express = require('express');
const { addImage, getImage, deleteImage, updateImage } = require('./mouee_controller');
const route = express.Router();
route.post('/addmoufee', addImage);
route.get('/getmoufee', getImage);
route.delete('/deletemoufee/:_id', deleteImage);
route.put('/updatemouffee/:_id', updateImage);

module.exports = route;