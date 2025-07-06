const express = require('express');
const rmodel = require('./registration_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// POST API: Add User
const Adduser = async (req, res) => {
    const {
        collage_name,
        reg_state,
        reg_district,
        reg_city,
        reg_university_name,
        reg_principal_name,
        reg_contact_person,
        reg_contact_person_contact1,
        reg_contact_person_contact2,
        reg_college_email_id,
        reg_college_username,
        reg_password,
        reg_mou_sign,
        reg_status
    } = req.body;

    try {
        // Check if the user already exists
        let user = await rmodel.findOne({ reg_college_username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reg_password, salt);

        // Create a new user instance
        const RegistrationData = new rmodel({
            collage_name,
            reg_state,
            reg_district,
            reg_city,
            reg_university_name,
            reg_principal_name,
            reg_contact_person,
            reg_contact_person_contact1,
            reg_contact_person_contact2,
            reg_college_email_id,
            reg_college_username,
            reg_password: hashedPassword,
            reg_mou_sign,
            reg_status
        });

        await RegistrationData.save();

        // Generate a JWT token
        const token = jwt.sign(
            { userId: RegistrationData._id },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// POST API: Login User
const Login = async (req, res) => {
    const { reg_college_username, reg_password } = req.body;

    try {
        let user = await rmodel.findOne({ reg_college_username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(reg_password, user.reg_password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            collage_name: user.collage_name,
            _id: user._id,
            token,
            mousigned: user.reg_mou_sign
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// GET API: Get All Users
const Getuser = async (req, res) => {
    try {
        const data = await rmodel.find();
        res.status(200).json({ data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// GET API: Get User by ID
const GetuserById = async (req, res) => {
    try {
        const { _id } = req.params;
        const userData = await rmodel.findById(_id);
        if (!userData) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ userData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// DELETE API: Delete User
const Deleteuser = async (req, res) => {
    try {
        const data = await rmodel.findByIdAndDelete(req.params._id);
        if (!data) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// PUT API: Update User
const Updateuser = async (req, res) => {
    const {
        collage_name,
        reg_state,
        reg_district,
        reg_city,
        reg_university_name,
        reg_principal_name,
        reg_contact_person,
        reg_contact_person_contact1,
        reg_contact_person_contact2,
        reg_college_email_id,
        reg_college_username,
        reg_password,
        reg_mou_sign,
        reg_status
    } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reg_password, salt);

        const data = await rmodel.findByIdAndUpdate(
            req.params._id,
            {
                collage_name,
                reg_state,
                reg_district,
                reg_city,
                reg_university_name,
                reg_principal_name,
                reg_contact_person,
                reg_contact_person_contact1,
                reg_contact_person_contact2,
                reg_college_email_id,
                reg_college_username,
                reg_password: hashedPassword,
                reg_mou_sign,
                reg_status
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Data updated successfully', data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// POST API: Forget Password
const forgetPassword = async (req, res) => {
    const { reg_college_email_id, reg_password } = req.body;

    try {
        const student = await rmodel.findOne({ reg_college_email_id });
        if (!student) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reg_password, salt);

        student.reg_password = hashedPassword;
        await student.save();

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhirajaher203@gmail.com',
        pass: 'Hermoinegranger',
    },
});

const sendVerificationEmail = (email, link) => {
    const mailOptions = {
        from: 'dhirajaher203@gmail.com',
        to: email,
        subject: 'Verification Email',
        text: `Please click on the following link to verify your email: ${link}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


module.exports = {
    Adduser,
    Login,
    Getuser,
    GetuserById,
    Deleteuser,
    Updateuser,
    forgetPassword,
    sendVerificationEmail
};
