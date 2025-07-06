const model = require('../district/district_model')

// post api
const adddistrict= async(req,res)=>{
    const { 
        district_state,
        district_name,
        district_status,
    }=req.body;

    try{

        const userData=new model({
            district_state,
            district_name,
            district_status,
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
const getdistrict=async(req,res)=>{
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
const getOnedistrict=async(req,res)=>{
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
const deletedistrict=async(req,res)=>{
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
const updatedistrict=async(req,res)=>{
const {district_state,
    district_name,
    district_status,}=req.body;

    try
    {
        const data=await model.updateOne(
            {_id:req.params.id},

            {
                $set:{
                    district_state,
                    district_name,
                    district_status,
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

module.exports={adddistrict,getdistrict,getOnedistrict,updatedistrict,deletedistrict};
