const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
     rideRequestId: {
          type: mongoose.Types.ObjectId,
          ref: 'RideRequest',
          required: true,
     },
     driverId: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     passengerId: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     source: {
          type: String,
          required: true,
     },
     destination: {
          type: String,
          required: true,
     },
     startTime: {
          type: Date,
          required: true,
     },
     endTime: {
          type: Date,
          required: true,
     },
     fare: {
          type: Number,
          required: true,
     },
     paymentId: {
          type: mongoose.Types.ObjectId,
          ref: 'Payment',
          required: true,
     }

}, { timestamps: true });

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;