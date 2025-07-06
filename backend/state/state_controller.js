const model = require('../state/state_model')

// post api
const addstate= async(req,res)=>{
    const { 
        state_name,
        state_status
    }=req.body;

    try{

        const userData=new model({
            state_name,
            state_status,
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
const getstate=async(req,res)=>{
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
const getOnestate=async(req,res)=>{
    try{
        const{_id}=req.params;
        const data=await model.findOne({ _id: _id });
        res.status(200).send(data);
    }
    catch(error)
    {
        console.log(error);
    }
}


// delete the data from with id
const deletestate=async(req,res)=>{
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
const updatestate=async(req,res)=>{
const { state_name,
    state_status,}=req.body;

    try
    {
        const data=await model.updateOne(
            {_id:req.params.id},

            {
                $set:{
                    state_name,
                    state_status,
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

module.exports={addstate,getstate,getOnestate,updatestate,deletestate};
