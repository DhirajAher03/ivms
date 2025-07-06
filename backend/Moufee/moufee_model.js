const mongoose = require('mongoose');

const myProject = new mongoose.Schema({
   college_name:String,
   fees_title:String,
   fees:Date,
   fees_status:{
    type:String,
    default:"pending"
   },
   fees_received:{
    type:String,
    default:"unpaid"
   },
   mousigned:String,
  
});
module.exports= mongoose.model('moufees',myProject);
