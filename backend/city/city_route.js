const { addcity,getcity,getOnecity,deletecity,updatecity} = require ('../city/city_controller')
const express=require('express');
const Controller=require('../city/city_controller');

const route=express.Router();

route.post('/addcity',addcity);
route.get('/getcity',getcity);
route.get('/getonecity/:id',getOnecity);
route.delete('/deletecity/:id',deletecity);
route.put('/updatecity/:id',updatecity);
module.exports=route;