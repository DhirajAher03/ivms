const mongoose = require('mongoose');

const myProject = new mongoose.Schema({
   college_name:String,
   Date_of_visit:Date,
   galleryimage:[String],
});
module.exports= mongoose.model('gallery',myProject);
