

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  usn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  },
  domain: {
    type: [String],
    required: true,
    enum: ["Tech", "Media", "Event Management", "PR and Marketing", "Documentation", "Design"]
  },
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const student=mongoose.model("student",userSchema);
module.exports=student;
