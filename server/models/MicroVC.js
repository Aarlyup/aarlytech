const mongoose = require('mongoose');

const microVCSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
    index: true
  },
  focus: {
    type: String,
    required: true,
    enum: ['Pre-seed', 'Seed', 'Series A'],
    index: true
  },
  cheque_size: {
    type: String,
    required: true
  },
  sectors: [{
    type: String,
    required: true
  }],
  total_companies: {
    type: Number,
    default: 0,
    min: 0
  },
  total_funding: {
    type: String,
    default: '₹0'
  },
  description: {
    type: String,
    default: ''
  },
  application_method: {
    type: String,
    default: ''
  },
  portfolio_url: {
    type: String,
    default: ''
  },
  website_url: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  linkedin_url: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Text search index
microVCSchema.index({
  name: 'text',
  description: 'text',
  sectors: 'text'
});

module.exports = mongoose.model('MicroVC', microVCSchema);