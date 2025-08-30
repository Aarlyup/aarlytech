const mongoose = require('mongoose');

const angelInvestorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  linkedinProfileUrl: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  investCategory: [{
    type: String,
    enum: [
      'Fintech',
      'Consumer & D2C',
      'SaaS & Enterprise Tech',
      'Healthtech',
      'Edtech',
      'AI / ML',
      'Deeptech',
      'Space Tech',
      'Cleantech & Climate',
      'Foodtech & Agritech',
      'Proptech & Infrastructure',
      'Mobility & Logistics',
      'Media, Gaming & Content'
    ]
  }],
  ticketSize: {
    type: Number,
    required: true
  },
  stage: [{
    type: String,
    enum: ['Idea', 'MVP', 'Pre-revenue', 'Revenue', 'Growth']
  }],
  preferFounderProfile: {
    type: String,
    default: ''
  },
  portfolioHighlights: {
    type: String,
    default: ''
  },
  contact: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance (without array fields in text index)
// Remove text index that's causing issues with array fields
angelInvestorSchema.index({ name: 1, city: 1, country: 1 });

module.exports = mongoose.model('AngelInvestor', angelInvestorSchema);