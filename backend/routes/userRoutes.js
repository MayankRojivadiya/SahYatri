const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authorization');

// send OTP route
router.post('/registerOTP', userController.registerOTP);

// User Registration
router.post('/register', userController.register);

// send login OTP route
router.post('/loginOTP', userController.loginOTP);

// User Login
router.post('/login', userController.login);

// get user
router.get('/getUser', authenticate ,userController.getUser);

/*

// Get User by ID
router.get('/:userId', userController.getUserById);

// Update User
router.put('/:userId', userController.updateUser);

// Delete User
router.delete('/:userId', userController.deleteUser);
*/
module.exports = router;
