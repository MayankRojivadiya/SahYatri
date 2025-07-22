const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Payment Schema
const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['cash', 'upi'],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  rideId: {
    type: mongoose.Types.ObjectId,
    ref: 'Ride',
    required: true,
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
