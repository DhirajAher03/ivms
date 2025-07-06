const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    university_name:String,
    university_status:String,
});
module.exports= mongoose.model('university',universitySchema);
