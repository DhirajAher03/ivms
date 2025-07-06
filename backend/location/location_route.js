const { addlocation,getlocation,getOnelocation,deletelocation,updatelocation} = require ('../location/location_controller')
const express=require('express');
const Controller=require('../location/location_controller');
const route=express.Router();

route.post('/addlocation',addlocation);
route.get('/getlocation',getlocation);
route.get('/getonelocation/:id',getOnelocation);
route.delete('/deletelocation/:id',deletelocation);
route.put('/updatelocation/:id',updatelocation);

module.exports=route;