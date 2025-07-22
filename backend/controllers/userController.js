const User = require('../models/user');
const OTP = require('../models/otp');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authorization');


const userController = {

  async registerOTP(req, res) {
    const { email } = req.body; // Extract user data and email

    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      existingOTP.otp = Math.floor(100000 + Math.random() * 900000);
      await existingOTP.save();
      return res.status(200).json({
        message: 'OTP updated and sent successfully',
        success: true,
      });
    } else {
      const otp = new OTP({
        email,
        otp: Math.floor(100000 + Math.random() * 900000),
        expiresAt: Date.now() + 5 * 60 * 1000 // <-- Add this line
      });
      await otp.save();
      return res.status(200).json({
        message: 'OTP sent successfully',
        success: true,
      });
    }
  },

  async register(req, res) {
    const { name, email, mobileNumber, accountType, photo, photoId, drivingLicence, vehicleNumber, otp } = req.body; // Extract user data and email

    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({
        message: 'OTP not found',
        success: false,
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(401).json({
        message: 'Invalid OTP',
        success: false,
      });
    }

    if (otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({
        message: 'OTP expired',
        success: false,
      });
    }

    // check for existing user based on email or mobile number
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
        success: false,
      });
    }

    const user = new User({
      name,
      email,
      mobileNumber,
      accountType,
      photo,
      photoId,
      drivingLicence,
      vehicleNumber,
      verified: true
    });

    await user.save();

    // Delete the OTP using the deleteOne() method
    // await otpDoc.deleteOne();

    return res.status(200).json({
      user,
      message: 'User registered successfully',
      success: true,
    });
  },

  async loginOTP(req, res) {
    const { mobileNumber } = req.body;

    const user = await User.findOne({ mobileNumber });
    const email = user.email;

    if (!user) {
      return res.status(404).json({
        message: 'User not registered',
        success: false,
      });
    }

    const existingOTP = OTP.findOne({ email });
    if (existingOTP) {
      // delete existing OTP
      await existingOTP.deleteOne();
    }
    // Generate a new OTP and send it
    const otp = new OTP({
      email,
      otp: Math.floor(100000 + Math.random() * 900000),
      expiresAt: Date.now() + 5 * 60 * 1000,
      purpose: 'login'
    });
    await otp.save();

    return res.status(200).json({
      message: 'OTP sent successfully',
      success: true,
    });

  },

  async login(req, res) {
    const { mobileNumber, otp } = req.body;
    const loginUser = await User.findOne({ mobileNumber });
    const email = loginUser.email;
    const otpDoc = await OTP.findOne({ email });
    

    if (!otpDoc) {
      return res.status(404).json({
        message: 'OTP not found',
        success: false,
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(401).json({
        message: 'Invalid OTP',
        success: false,
      });
    }

    if (otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({
        message: 'OTP expired',
        success: false,
      });
    }

    // Find the user with the matching email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    // Delete the OTP
    await otpDoc.deleteOne();

    // Generate a JWT token using sh256 for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      user,
      token,
      message: 'Login successful',
      success: true,
    });
  },

  async getUser(req, res) {
    try{
      const user = await User.findById(req.user.userId);
      res.status(200).json({
        user,
        message: 'User details sent successfully',
        success: true,
      });
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Invalid token', success: false });
    }
  }
};

module.exports = userController;

/*
const userController = {

  
    async registerOTP(req, res) {
    const { name, email, mobileNumber, accountType, photo, photoId, drivingLicence, vehicleNumber } = req.body;

    // Check for existing user based on email or mobile number
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (existingUser && existingUser.verified) {
      res.status(409).json({ error: 'User already exists', success: false });
    } else if (!existingUser) {
      // Create a new user
      const otp = Math.floor(1000 + Math.random() * 9000);
      await sendMail(email, otp, "Registration OTP");

      const newUser = new User({
        name,
        email,
        mobileNumber,
        accountType,
        photo,
        photoId,
        drivingLicence,
        vehicleNumber,
        otp
      });

      await newUser.save();
      res.status(200).json({ newUser, message: 'OTP sent successfully', success: true });
    } else if (existingUser && !existingUser.verified) {
      // Update the existing user
      const otp = Math.floor(1000 + Math.random() * 9000);
      await sendMail(email, otp, "Registration OTP");

      existingUser.otp = otp;
      await existingUser.save();
      res.status(200).json({ existingUser, message: 'OTP sent successfully', success: true });
    }
  },
  
  async registerOTP(req, res) {
    const { email } = req.body;
    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      // If OTP already exists, update it
      existingOTP.otp = Math.floor(1000 + Math.random() * 9000);
      await existingOTP.save();
    } else {
      // Create a new OTP
      const otp = new OTP({
        email,
        otp: Math.floor(1000 + Math.random() * 9000)
      });
      await otp.save();
    }

    res.status(200).json({ message: 'OTP sent successfully', success: true });
  },


    // Register a new user
    async register(req, res) {
      const { email, otp } = req.body;
      // const otp = req.body.otp;
  
      // compare otp with the otp in db
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User Not Found', success: false });
      }
      if (user.otp !== otp) {
        return res.status(401).json({ error: 'Invalid OTP', success: false });
      }
  
      // delete otp from db
      user.otp = 0;
  
      // set verified to true
      user.verified = true;
  
      // save user
      user.save();
  
      // send success message
      res.status(200).json({ user, message: 'User registered successfully', success: true });
  
    },
  

  async register(req, res) {
    const { name, email, mobileNumber, accountType, photo, photoId, drivingLicence, vehicleNumber, otp  } = req.body;

    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({ error: 'OTP not found', success: false });
    }

    if (otpDoc.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP', success: false });
    }

    if (otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'OTP expired', success: false });
    }

    // Create the user
    const user = new User({
      name,
      email,
      mobileNumber,
      accountType,
      photo,
      photoId,
      drivingLicence,
      vehicleNumber,
      verified: true
    });
    await user.save();

    // Delete the OTP
    await otpDoc.delete();

    res.status(200).json({ user, message: 'User registered successfully', success: true });
  },


  // send login otp
  async loginOTP(req, res) {
    try {
      const { email } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not registered', success: false });
      }

      const otp = Math.floor(1000 + Math.random() * 9000);
      await sendMail(email, otp, "Login OTP");
      // update otp in db
      existingUser.otp = otp;
      existingUser.save();
      res.status(200).json({ existingUser, message: 'OTP sent successfully', success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', success: false });
    }
  },

  // User login with OTP verification
  async login(req, res) {
    try {
      const { email, otp } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not registered', success: false });
      }
      if (existingUser.otp !== otp) {
        return res.status(401).json({ error: 'Invalid OTP', success: false });
      }


      const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      existingUser.token = token;

      existingUser.save();
      res.status(200).json({ message: 'User logged in successfully', token, success: true, user: existingUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  },

  // Get user details by user ID
  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const objectIdUserId = new ObjectId(userId);
      const user = await User.findById(objectIdUserId);
      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  },

  // Update user details
  async updateUser(req, res) {
    const { userId } = req.params;
    try {
      const objectIdUserId = new ObjectId(userId);
      const updatedUser = await User.findByIdAndUpdate(objectIdUserId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a user account
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const objectIdUserId = new ObjectId(userId);
      const deletedUser = await User.findByIdAndDelete(objectIdUserId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
*/
module.exports = userController;