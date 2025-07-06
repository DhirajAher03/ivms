const { adddistrict,getdistrict,getOnedistrict,deletedistrict,updatedistrict} = require ('../district/district_controller')
const express=require('express');
const Controller=require('../district/district_controller');

const route=express.Router();

route.post('/adddistrict',adddistrict);
route.get('/getdistrict',getdistrict);
route.get('/getonedistrict/:_id',getOnedistrict);
route.delete('/deletedistrict/:id',deletedistrict);
route.put('/updatedistrict/:id',updatedistrict);

module.exports=route;