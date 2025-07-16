const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// ✅ Razorpay route import
const payment_route = require('./routes/PaymentRoute'); // ✅ ADD THIS LINE

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
app.use(cors({
  origin: "http://localhost:3000",  // ✅ frontend origin
  credentials: true                 // ✅ if sending cookies/token headers
}));
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

app.use('/api/location', locationroute);
app.use('/api/university', universityroute);
app.use('/api/state', stateroute);
app.use('/api/district', districtroute);
app.use('/api/city', cityroute);
app.use('/api/registration', registration_route);
app.use('/api/agenda', agenda_route);
app.use('/api/fees', fees_route);
app.use('/api/feedback', feedback_route);
app.use("/api/visit", visit_route);
app.use("/api/admin", admin_route);
app.use("/api/gallery", gallery_route);
app.use("/api/moufee", moudfeeroute);
app.use("/api/payment", payment_route);


// Default route
app.get('/', (req, res) => {
  res.send("Connected to local host.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
