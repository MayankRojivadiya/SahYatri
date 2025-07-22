const { ObjectId } = require('mongodb');
const Ride = require('../models/ride');

const rideController = {
  // Create a new ride
  async createRide(req, res) {
    try {
      const newRide = new Ride(req.body);
      await newRide.save();
      res.status(201).json(newRide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create ride' });
    }
  },

  // Get all rides
  async getRides(req, res) {
    try {
      const rides = await Ride.find();
      res.json(rides);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch rides' });
    }
  },

  // Get a ride by its ID
  async getRideById(req, res) {
    const { rideId } = req.params;
    try {
      const objectIdRideId = new ObjectId(rideId);
      const ride = await Ride.findById(objectIdRideId);
      if (!ride) {
        return res.status(404).json({ error: 'Ride not found' });
      }
      res.json(ride);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch ride' });
    }
  },

  // Update a ride
  async updateRide(req, res) {
    const { rideId } = req.params;
    try {
      const objectIdRideId = new ObjectId(rideId);
      const updatedRide = await Ride.findByIdAndUpdate(objectIdRideId, req.body, { new: true });
      if (!updatedRide) {
        return res.status(404).json({ error: 'Ride not found' });
      }
      res.json(updatedRide);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update ride' });
    }
  },

  // Delete a ride
  async deleteRide(req, res) {
    const { rideId } = req.params;
    try {
      const objectIdRideId = new ObjectId(rideId);
      const deletedRide = await Ride.findByIdAndDelete(objectIdRideId);
      if (!deletedRide) {
        return res.status(404).json({ error: 'Ride not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete ride' });
    }
  },
};

module.exports = rideController;
