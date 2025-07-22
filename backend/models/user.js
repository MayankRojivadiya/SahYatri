const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     mobileNumber: {
          type: Number,
          required: true,
          unique: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     accountType:{
          type:String,
          required:true,
     },
     vehicleNumber: {
          type: String,
          required: false,
     },
     drivingLicence:{
          type:String,
          required:false,
     },
     photo: {
          type: String, // Assuming that the photo is a URL
          required: false,
     },
     photoId: {
          type: String, // Assuming that the photo ID is a URL
          required: false,
     },
     ratings: [
          {
               rating: {
                    type: Number,
                    required: false,
                    min: 1,
                    max: 5,
               },
               reviewText: {
                    type: String,
                    required: false,
               },
          },
     ],
     verified: {
          type: Boolean,
          required: true,
          default: false,
     },
}, { timestamps: true });




const User = mongoose.model('User', userSchema);

module.exports = User;
