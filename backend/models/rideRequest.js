const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideRequestSchema = new Schema({
     userId: {
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
     travelTime: {
          type: String,
          required: true,
     }
}, { timestamps: true });

const RideRequest = mongoose.model('RideRequest', rideRequestSchema);

module.exports = RideRequest;