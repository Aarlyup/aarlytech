const mongoose = require('mongoose');

const govtGrantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
    enum: ['Open', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'SaaS', 'AI/ML', 'Deep Tech', 'Clean Tech', 'Manufacturing', 'Agriculture', 'Other'],
    default: 'Open'
  },
  grantSize: {
    type: Number,
    required: true
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
  timelines: {
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
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance (without array fields in text index)
govtGrantSchema.index({ name: 'text', authority: 'text' });

module.exports = mongoose.model('GovtGrant', govtGrantSchema);