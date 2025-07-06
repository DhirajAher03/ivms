const model = require('../city/city_model')

// post api
const addcity = async (req, res) => {
    const {
        city_state,
        city_district,
        city_name,
        city_status
    } = req.body;

    try {

        const userData = new model({
            city_state,
            city_district,
            city_name,
            city_status
        })

        const data = await userData.save();
        res.status(200).send({ data });

    }

    catch (error) {
        console.log(error);
    }
}

// get api
const getcity = async (req, res) => {
    try {
        const data = await model.find({});
        res.status(200).send({ data });
    }

    catch (error) {
        console.log(error);
    }
}

// get one api
const getOnecity = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.findOne({ _id: id });
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
    }
}


// delete the data from with id
const deletecity = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.deleteOne({ _id: id });
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
    }
}


// update data with id
const updatecity = async (req, res) => {
    const { city_state,
        city_district,
        city_name,
        city_status } = req.body;

    try {
        const data = await model.updateOne(
            { _id: req.params.id },

            {
                $set: {
                    city_state,
                    city_district,
                    city_name,
                    city_status
                }
            },
        )

        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
    }


}

module.exports = { addcity, getcity, getOnecity, updatecity, deletecity };
