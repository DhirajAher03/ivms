const model = require('../location/location_model')

// post api
const addlocation= async(req,res)=>{
    const { location_city,
        location_name,
        location_status
    }=req.body;

    try{

        const userData=new model({
            location_city,
        location_name,
        location_status
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
const getlocation=async(req,res)=>{
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
const getOnelocation=async(req,res)=>{
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
const deletelocation=async(req,res)=>{
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
const updatelocation=async(req,res)=>{
const {location_city,
    location_name,
    location_status}=req.body;

    try
    {
        const data=await model.updateOne(
            {_id:req.params.id},

            {
                $set:{
                    location_city,
                    location_name,
                    location_status
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

module.exports={addlocation,getlocation,getOnelocation,updatelocation,deletelocation};
