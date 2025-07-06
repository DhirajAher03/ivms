const model = require("./gallery_model");

// POST API
const addImage = async (req, res) => {
    const {
        college_name,
        Date_of_visit,
    } = req.body;

    try {
        const Userdata = new model({
            college_name,
            Date_of_visit,
            galleryimage:req.files.map(file => file.filename),
        });
        const data = await Userdata.save();
        res.status(200).send({ data });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to add visit' });
    }
};


// GET API
const getImage = async (req, res) => {
  try {
    const userData = await model.find();
    res.status(200).send({ userData });
  } catch (err) {
    res.status(400).send(err);
  }
};

// DELETE API
const deleteImage = async (req, res) => {
  try {
    const data = await model.deleteOne({ _id: req.params._id });
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateImage = async (req, res) => {
  const {
    college_name,
    Date_of_visit,
 } = req.body;

  try {
    // Prepare update object
    const updateData = {
        college_name,
        Date_of_visit,
    };

    // Only update the image if a new file is uploaded
    if (req.file) {
      galleryimage = req.files.map(file => file.filename);
    }

    const data = await model.updateOne(
      { _id: req.params._id },
      { $set: updateData }
    );

    if (data) {
      res.status(200).send({ message: "User updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { addImage, getImage, updateImage, deleteImage };
