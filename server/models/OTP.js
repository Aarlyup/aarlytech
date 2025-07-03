const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['email_verification', 'password_reset'],
    required: true
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes in seconds (creates TTL index)
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
otpSchema.index({ email: 1, type: 1, isUsed: 1 });

module.exports = mongoose.model('OTP', otpSchema);
