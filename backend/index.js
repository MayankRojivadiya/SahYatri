const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
     cors({
          origin: true,
          credentials: true,
     })
);


// Connect to MongoDB
if (process.env.NODE_ENV === 'development') {
     // mongoose.connect(process.env.MONGODB_URI_LOCAL);
     // console.log('Connected to MongoDB Local');
     mongoose.connect(process.env.MONGODB_URI);
     console.log('Connected to MongoDB Atlas');
}
else {
     mongoose.connect(process.env.MONGODB_URI);
     console.log('Connected to MongoDB Atlas');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
     console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rides', require('./routes/rideRoutes'));
app.use('/api/ride-requests', require('./routes/rideRequestRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
     console.log(`SahYatri is running on port ${PORT}`);
});
