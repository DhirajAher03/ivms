const rmodel = require('./agenda_model')
require('dotenv').config();

// POST API
const Adduser = async (req, res) => {
    const {agenda_title,
        agenda_description,
        agenda_time,
        agenda_status} = req.body;
    try{
        const ServiceData = new rmodel({
            agenda_title,
        agenda_description,
        agenda_time,
        agenda_status
        })
        const data = await ServiceData.save()
        res.status(200).send({data, message: "Service added successfully" })
    
    }
    catch(err) {
        console.log(err);
    }
}

// GET APIs
const Getuser = async (req, res) => {
    try {
        const data = await rmodel.find({})
        res.status(200).send({ data })
    }

    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
}
// GET API ONLY FIND ONE
const GetuserById = async (req, res) => {
    try {
        const { _id } = req.params
        const userData = await rmodel.findOne({ _id: _id })
        res.status(200).send({ userData })

    } catch (err) {
        // res.status(400).send(err)
        console.log(err)
    }
}

// DELETE API
const Deleteuser = async (req, res) => {

    try {
        const data = await rmodel.deleteOne({ _id: req.params._id })
        res.status(200).send({ data })
    } catch (err) {
        res.status(500).send(err)
    }
}

// UPDATE API
const Updateuser = async (req, res) => {
    const { 
        
        agenda_title,
        agenda_description,
        agenda_time,
        agenda_status,
        } = req.body;
    try {


        const data = await rmodel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    agenda_title,
                    agenda_description,
                    agenda_time,
                    agenda_status,
                }
            },
        );

        if (data) {
            res.status(200).send({ message: "Data Updated Successfully" });
        } else {
            res.status(404).send({ message: "Can Not User" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};
module.exports = { Adduser, Getuser, GetuserById, Deleteuser, Updateuser }
