const mongoose = require('mongoose');

const microVCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    url: String,
    publicId: String
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
  fundSize: {
    type: Number,
    required: true
  },
  fundSizeCurrency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  checkSize: {
    type: Number,
    required: true
  },
  checkSizeCurrency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  stage: [{
    type: String,
    enum: ['Pre-seed', 'Seed', 'Series A']
  }],
  sector: [{
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
  contact: {
    type: String,
    required: true
  },
  portfolioHighlights: {
    type: String,
    default: ''
  },
  fundSizeDescription: {
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

// Index for better search performance (without array fields in text index)
// Remove text index that's causing issues with array fields
microVCSchema.index({ name: 1, location: 1 });

module.exports = mongoose.model('MicroVCNew', microVCSchema);