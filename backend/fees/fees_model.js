const mongoose = require('mongoose')

const FormData = mongoose.Schema({

        fees_title:String,
        fees_amount:Number,
        fees_status:String,
});
module.exports= mongoose.model('fees', FormData)