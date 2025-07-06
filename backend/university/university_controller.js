const model = require('../university/university_model')

// post api
const adduniversity= async(req,res)=>{
    const { university_name,
        university_status
    }=req.body;

    try{

        const userData=new model({
            university_name,
            university_status
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
const getuniversity=async(req,res)=>{
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
const getOneuniversity=async(req,res)=>{
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
const deleteuniversity=async(req,res)=>{
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
const updateuniversity=async(req,res)=>{
const {university_name,
    university_status}=req.body;

    try
    {
        const data=await model.updateOne(
            {_id:req.params.id},

            {
                $set:{
                    university_name,
                    university_status
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

module.exports={adduniversity,getuniversity,getOneuniversity,updateuniversity,deleteuniversity};
