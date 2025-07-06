const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// ✅ Razorpay route import
const payment_route = require('./routes/paymentRoute'); // ✅ ADD THIS LINE

// Routes
const locationroute = require('./location/location_route');
const universityroute = require('./university/university-route');
const stateroute = require("./state/state_route");
const districtroute = require("./district/district_route");
const cityroute = require('./city/city_route');
const registration_route = require('./registration/registration_route');
const agenda_route = require('./agenda/agenda_route');
const fees_route = require('./fees/fees_route');
const feedback_route = require("./feedback/feedback_route");
const visit_route = require("./Visit/visit_route");
const admin_route = require("./Admin/admin_route");
const gallery_route = require("./Gallery/galllery_route");
const moudfeeroute = require("./Moufee/moufee_route");

// CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 50000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error:', err));

// Middleware to parse JSON
app.use(express.json());

// Serve uploaded images
app.use('/images', express.static('Images'));

// Routes
app.use('/', locationroute);
app.use('/', universityroute);
app.use('/', stateroute);
app.use('/', districtroute);
app.use('/', cityroute);
app.use('/', registration_route);
app.use('/', agenda_route);
app.use('/', fees_route);
app.use('/', feedback_route);
app.use("/", visit_route);
app.use("/", admin_route);
app.use("/", gallery_route);
app.use("/", moudfeeroute);
app.use("/", payment_route); // ✅ ADD THIS LINE

// Default route
app.get('/', (req, res) => {
  res.send("Connected to local host.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
