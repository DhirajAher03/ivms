const { adduniversity,getuniversity,getOneuniversity,deleteuniversity,updateuniversity} = require ('../university/university_controller')
const express=require('express');
const Controller=require('../university/university_controller');

const route=express.Router();

route.post('/adduniversity',adduniversity);
route.get('/getuniversity',getuniversity);
route.get('/getoneuniversity/:id',getOneuniversity);
route.delete('/deleteuniversity/:id',deleteuniversity);
route.put('/updateuniversity/:id',updateuniversity);

module.exports=route;