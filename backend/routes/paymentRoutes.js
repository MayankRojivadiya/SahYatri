const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Process a payment for a ride
router.post('/', paymentController.processPayment);

// Get payment details by payment ID
router.get('/:paymentId', paymentController.getPaymentById);

// Update payment details
router.put('/:paymentId', paymentController.updatePayment);

// Delete a payment
router.delete('/:paymentId', paymentController.deletePayment);

module.exports = router;
