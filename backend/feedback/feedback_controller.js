const model = require('../feedback/feedback_model')

// post api
const addfeedback= async(req,res)=>{
    const { college_name,   feedback_Visit_Date,
        feedback_message
    }=req.body;

    try{

        const userData=new model({
            college_name,
            feedback_Visit_Date,
            feedback_message
        })

        const data=await userData.save();
        res.status(200).send({data});

    }

    catch(error)
    {
        console.log(error);
    }
}

// get api
const getfeedback=async(req,res)=>{
    try{
        const data=await model.find({});
        res.status(200).send({data});
    }

    catch(error)
    {
        console.log(error);
    }
}

// get one api
const getOnefeedback=async(req,res)=>{
    try{
        const{id}=req.params;
        const data=await model.findOne({ _id: id });
        res.status(200).send(data);
    }
    catch(error)
    {
        console.log(error);
    }
}


// delete the data from with id
const deletefeedback=async(req,res)=>{
    try{
        const{id}=req.params;
        const data=await model.deleteOne({ _id: id });
        res.status(200).send(data);
    }
    catch(error)
    {
        console.log(error);
    }
}


// update data with id
const updatefeedback=async(req,res)=>{
const {college_name, feedback_Visit_Date,
    feedback_message}=req.body;

    try
    {
        const data=await model.updateOne(
            {_id:req.params.id},

            {
                $set:{
                    college_name,
                    feedback_Visit_Date,
        feedback_message
                }
            },
        )

        res.status(200).send(data);   
    }
    catch(error)
    {
        console.log(error);
    }


}

module.exports={addfeedback,getfeedback,getOnefeedback,deletefeedback,updatefeedback};
