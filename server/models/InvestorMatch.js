const mongoose = require('mongoose');

const investorMatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stage: {
    type: String,
    required: true,
    enum: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+']
  },
  industry: {
    type: String,
    required: true
  },
  traction: {
    type: String,
    required: true,
    enum: ['Idea', 'MVP', 'Users', 'Revenue', 'Profitable']
  },
  description: {
    type: String,
    required: true
  },
  checkSize: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  linkedin: {
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
investorMatchSchema.index({ stage: 1, industry: 1, traction: 1 });

module.exports = mongoose.model('InvestorMatch', investorMatchSchema);