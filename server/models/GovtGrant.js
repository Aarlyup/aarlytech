const mongoose = require('mongoose');

const govtGrantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    url: String,
    publicId: String
  },
  authority: {
    type: String,
    required: true,
    enum: ['DPIIT', 'DST', 'MSME', 'BIRAC', 'SERB', 'CSIR', 'Other']
  },
  stage: [{
    type: String,
    enum: ['Idea', 'MVP', 'Pre-revenue', 'Revenue', 'Growth']
  }],
  sector: {
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
    ],
  },
  grantSize: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  equityDilution: {
    type: String,
    default: 'None'
  },
  eligibility: {
    type: String,
    required: true
  },
  howToApply: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  documentsRequired: [{
    type: String
  }],
  specialNotes: {
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
govtGrantSchema.index({ name: 1, authority: 1 });

module.exports = mongoose.model('GovtGrant', govtGrantSchema);
