const express = require('express');
const router = express.Router();
const rideRequestController = require('../controllers/rideRequestController');

// Create a new ride request
router.post('/', rideRequestController.createRideRequest);

//Get all ride requests
router.get('/all-ride-requests',rideRequestController.getRideRequests);

// Get ride request details by request ID
router.get('/:requestId', rideRequestController.getRideRequestById);

// Accept a ride request
router.put('/accept/:requestId', rideRequestController.acceptRideRequest);

// Update ride request details
router.put('/:requestId', rideRequestController.updateRideRequest);

// Delete a ride request
router.delete('/:requestId', rideRequestController.deleteRideRequest);

module.exports = router;
