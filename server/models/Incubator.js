const mongoose = require('mongoose');

const incubatorSchema = new mongoose.Schema({
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
    enum: ['Govt-backed', 'Private', 'University-backed'],
    index: true
  },
  tags: [{
    type: String,
    enum: ['Infra', 'Grant', 'No Equity', 'Equity']
  }],
  application_status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed'],
    default: 'Open',
    index: true
  },
  funding_offered: {
    type: String,
    default: ''
  },
  equity_taken: {
    type: String,
    default: '0%'
  },
  duration_weeks: {
    type: Number,
    default: 12,
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
  startup_supporter_label: {
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
  }],
  company_email: {
    type: String,
    default: ''
  },
  company_linkedin: {
    type: String,
    default: ''
  },
  person_of_contact: {
    type: String,
    default: ''
  },
  person_email: {
    type: String,
    default: ''
  },
  person_linkedin_url: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Text search index
incubatorSchema.index({
  name: 'text',
  description: 'text',
  sectors_supported: 'text'
});

module.exports = mongoose.model('Incubator', incubatorSchema);