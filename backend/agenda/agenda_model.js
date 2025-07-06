const mongoose = require('mongoose')

const FormData = mongoose.Schema({

        agenda_title:String,
        agenda_description:String,
        agenda_time:String,
        agenda_status:String,
});
module.exports= mongoose.model('agenda', FormData)