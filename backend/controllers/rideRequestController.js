const { ObjectId } = require('mongodb');
const RideRequest = require('../models/rideRequest');

const rideRequestController = {
  // Create a new ride request
  async createRideRequest(req, res) {
    try {
      // Implement ride request creation logic based on your model and requirements
      const newRideRequest = new RideRequest(req.body);
      await newRideRequest.save();
      res.status(201).json({
        success: true,
        message: "Ride Request created successfully",
        newRideRequest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create ride request' });
    }
  },

  // Get all ride requests
  async getRideRequests(req, res) {
    try {
      const rideRequests = await RideRequest.find();
      const totalRideRequests = await RideRequest.countDocuments();

      res.json({
        rideRequests,
        totalRideRequests,
        success: true,
        message: "Ride Requests Fetch Successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch ride requests' });
    }
  },

  // Get a ride request by its ID
  async getRideRequestById(req, res) {
    const { requestId } = req.params;
    try {
      // const objectIdRideRequestId = new ObjectId(requestId);
      const rideRequest = await RideRequest.find({ userId: requestId });
      if (!rideRequest) {
        return res.status(404).json({ error: 'Ride request not found' });
      }
      res.json({
        success: true,
        message: "ride reqest fetched successfully",
        rideRequest
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch ride request' });
    }
  },

  // Accept a ride request
  async acceptRideRequest(req, res) {
    const { requestId } = req.params;
    const { driverId } = req.body;

    try {
      const updatedRequest = await RideRequest.findByIdAndUpdate(
        requestId,
        { status: "accepted", driverId },
        { new: true }
      );

      if (!updatedRequest) {
        return res.status(404).json({ error: "Ride request not found" });
      }

      res.status(200).json({
        success: true,
        message: "Ride request accepted",
        updatedRequest,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to accept ride request" });
    }
  },


  // Update a ride request
  async updateRideRequest(req, res) {
    const { rideRequestId } = req.params;
    try {
      const objectIdRideRequestId = new ObjectId(rideRequestId);
      const updatedRideRequest = await RideRequest.findByIdAndUpdate(objectIdRideRequestId, req.body, { new: true });
      if (!updatedRideRequest) {
        return res.status(404).json({ error: 'Ride request not found' });
      }
      res.json(updatedRideRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update ride request' });
    }
  },

  // Delete a ride request
  async deleteRideRequest(req, res) {
    const { rideRequestId } = req.params;
    try {
      const objectIdRideRequestId = new ObjectId(rideRequestId);
      const deletedRideRequest = await RideRequest.findByIdAndDelete(objectIdRideRequestId);
      if (!deletedRideRequest) {
        return res.status(404).json({ error: 'Ride request not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete ride request' });
    }
  },
};

module.exports = rideRequestController;
