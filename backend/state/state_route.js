const { addstate,getstate,getOnestate,deletestate,updatestate} = require ('../state/state_controller')
const express=require('express');
const Controller=require('../state/state_controller');

const route=express.Router();

route.post('/addstate',addstate);
route.get('/getstate',getstate);
route.get('/getonestate/:_id',getOnestate);
route.delete('/deletestate/:id',deletestate);
route.put('/updatestate/:id',updatestate);

module.exports=route;