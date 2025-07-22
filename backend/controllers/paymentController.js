const { ObjectId } = require('mongodb');
const Payment = require('../models/payment');

const paymentController = {
  // Create a new payment
  async createPayment(req, res) {
    try {
      // Implement payment creation logic based on your payment gateway integration
      const newPayment = new Payment(req.body);
      await newPayment.save();
      res.status(201).json(newPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  },

  // Get all payments
  async getPayments(req, res) {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  },

  // Get a payment by its ID
  async getPaymentById(req, res) {
    const { paymentId } = req.params;
    try {
      const objectIdPaymentId = new ObjectId(paymentId);
      const payment = await Payment.findById(objectIdPaymentId);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  },

  // Update a payment
  async updatePayment(req, res) {
    const { paymentId } = req.params;
    try {
      const objectIdPaymentId = new ObjectId(paymentId);
      const updatedPayment = await Payment.findByIdAndUpdate(objectIdPaymentId, req.body, { new: true });
      if (!updatedPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(updatedPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update payment' });
    }
  },

  // Delete a payment
  async deletePayment(req, res) {
    const { paymentId } = req.params;
    try {
      const objectIdPaymentId = new ObjectId(paymentId);
      const deletedPayment = await Payment.findByIdAndDelete(objectIdPaymentId);
      if (!deletedPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  },
};

module.exports = paymentController;
