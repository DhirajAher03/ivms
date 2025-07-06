const model = require("./visit_model");

// POST API
const addImage = async (req, res) => {
    const {
        college_name,
        number_of_students,
        Date_of_visit,
        start_time,
        end_time,
        number_of_faculty,
        purpose,
        visting_location,
        comment,
        Visit_accept,
        Visit_status,
        reason,
        notification_status,
        mousigned,
        fees,
        fees_status,
        fees_received,visit_cancelled,transaction_id
    } = req.body;

    try {
        const Userdata = new model({
          college_name,
            number_of_students,
            Date_of_visit,
            start_time,
            end_time,
            number_of_faculty,
            purpose,
            visting_location,
            student_details: req.files['student_details'][0].filename,
            faculty_details: req.files['faculty_details'][0].filename,
            comment,
            Visit_accept,
            Visit_status,
            reason,
            notification_status,
            mousigned,
            fees,
            fees_status,
            fees_received,visit_cancelled,transaction_id
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

const GetuserById = async (req, res) => {
  try {
      const { _id } = req.params
      const data = await model.findOne({ _id: _id })
      res.status(200).send({ data })

  } catch (err) {
      
      console.log(err)
  }
}

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
    number_of_students,
    Date_of_visit,
    start_time,
    end_time,
    number_of_faculty,
    purpose,
    visting_location,
    comment,
    Visit_accept,
    Visit_status,
    reason,
    notification_status,
    mousigned,
    fees,
    fees_status,
    fees_received,visit_cancelled,transaction_id } = req.body;

  try {
    // Prepare update object
    const updateData = {
       college_name,
        number_of_students,
        Date_of_visit,
        start_time,
        end_time,
        number_of_faculty,
        purpose,
        visting_location,
        comment,
        Visit_accept,
        Visit_status,
        reason,
        notification_status,
        mousigned,
        fees,
        fees_status,
        fees_received,visit_cancelled,transaction_id
    };

    // Only update the image if a new file is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
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

module.exports = { addImage, getImage, updateImage, deleteImage ,GetuserById};
