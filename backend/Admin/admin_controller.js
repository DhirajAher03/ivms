const amodel = require('./admin_model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST API
const AddAdmin = async (req, res) => {
    const { admin_name, username, password } = req.body;

    try {
        // Check if the student already exists
        let user = await amodel.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new student instance
        const RegistrationData = new amodel({
            admin_name,
            username,
            password: hashedPassword,

        })
        // const data = await RegistrationData.save()
        // res.status(200).send({ data })
        await RegistrationData.save()

        // Generate a JWT token
        const token = jwt.sign(
            { userId: RegistrationData._id },
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '10h' }
        );

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// Admin Login
const AdminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the student exists
        let user = await amodel.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '10h' }
        );

        // Respond with the token
        res.json({
            admin_name: user.admin_name,
            id: user._id,
            token: token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { AddAdmin, AdminLogin }