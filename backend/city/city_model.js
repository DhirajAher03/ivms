const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city_state:String,
    city_district:String,
    city_name:String,
    city_status:String,
});
module.exports= mongoose.model('city',citySchema);

