const { addfeedback,getfeedback,getOnefeedback,deletefeedback,updatefeedback} = require ('../feedback/feedback_controller')
const express=require('express');
const Controller=require('../feedback/feedback_controller');

const route=express.Router();

route.post('/addfeedback',addfeedback);
route.get('/getfeedback',getfeedback);
route.get('/getonefeedback/:id',getOnefeedback);
route.delete('/deletefeedback/:id',deletefeedback);
route.put('/updatefeedback/:id',updatefeedback);

module.exports=route;