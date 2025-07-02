const mongoose = require('mongoose');

const acceleratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  logo_url: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    required: true,
    index: true
  },
  affiliation: {
    type: String,
    required: true,
    enum: ['Govt-backed', 'Corporate', 'Independent'],
    index: true
  },
  tags: [{
    type: String,
    enum: ['Equity', 'Grant', 'Global', 'Remote', 'Infra']
  }],
  application_status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed'],
    default: 'Open',
    index: true
  },
  batch_frequency: {
    type: String,
    required: true
  },
  equity_taken: {
    type: String,
    required: true
  },
  funding_offered: {
    type: String,
    required: true
  },
  duration_weeks: {
    type: Number,
    required: true,
    min: 1
  },
  total_startups_supported: {
    type: Number,
    default: 0,
    min: 0
  },
  funded_startup_percent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  company_email: {
    type: String,
    default: ''
  },
  company_linkedin: {
    type: String,
    default: ''
  },
  poc_email: {
    type: String,
    default: ''
  },
  poc_linkedin: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  website_url: {
    type: String,
    default: ''
  },
  sectors_supported: [{
    type: String
  }]
}, {
  timestamps: true
});

// Text search index
acceleratorSchema.index({
  name: 'text',
  description: 'text',
  sectors_supported: 'text'
});

module.exports = mongoose.model('Accelerator', acceleratorSchema);