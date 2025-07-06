const mongoose = require('mongoose');

const incubatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  fundingSupport: {
    type: String,
    required: true
  },
  otherBenefits: {
    type: String,
    default: ''
  },
  eligibility: {
    type: String,
    required: true
  },
  applicationProcess: {
    type: String,
    enum: ['Rolling', 'Batch-based', 'Quarterly', 'Bi-annual'],
    default: 'Rolling'
  },
  contact: {
    type: String,
    required: true
  },
  alumniStartups: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
incubatorSchema.index({ name: 'text', location: 'text' });

module.exports = mongoose.model('IncubatorNew', incubatorSchema);