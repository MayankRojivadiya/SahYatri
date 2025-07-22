const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Create a new ride
router.post('/', rideController.createRide);

// Get ride details by ride ID
router.get('/:rideId', rideController.getRideById);

// Update ride details
router.put('/:rideId', rideController.updateRide);

// Delete a ride
router.delete('/:rideId', rideController.deleteRide);

module.exports = router;
