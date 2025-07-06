const mongoose = require('mongoose');

const feeddbackSchema = new mongoose.Schema({
    college_name:String,
    feedback_Visit_Date:Date,
    feedback_message:String,
});
module.exports= mongoose.model('feedback',feeddbackSchema);
