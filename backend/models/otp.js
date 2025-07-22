const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_USER = process.env.SMTP_USER;
const FROM_EMAIL = process.env.FROM_EMAIL;

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure only one OTP per email at a time
  },
  otp: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  purpose: { // Added a field to store the OTP purpose
    type: String,
    default: 'registration'
  }
});

// Pre-save hook to set expiration time and purpose
otpSchema.pre('save', async function (next) {
  this.expiresAt = Date.now() + 1 * 60 * 1000; // Calculate expiration time for 5 minutes in milliseconds
  this.purpose = this.purpose || 'registration'; // Set default purpose if not provided
  next();
});

// Post-save hook to send email with dynamic subject
otpSchema.post('save', async function (doc) {
  const subject = `${doc.purpose.charAt(0).toUpperCase() + doc.purpose.slice(1)} OTP`;
  await sendMail(doc.email, doc.otp, subject);
});


const sendMail = (email, otp, subject) => {
     const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
               user: SMTP_USER,
               pass: SMTP_PASSWORD,
          }
     });


     const mailOptions = {
          from: FROM_EMAIL,
          to: email,
          subject,
          text: `Your verification OTP is ${otp}`
     };

     transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
               console.log(err);
          } else {
               console.log(info);
          }
     });
};

module.exports = mongoose.model('OTP', otpSchema);
