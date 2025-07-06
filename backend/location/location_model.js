const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location_city:String,
    location_name:String,
    location_status:String,
});
module.exports= mongoose.model('location',locationSchema);
