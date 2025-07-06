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
    enum: ['Fintech', 'Consumer', 'SaaS', 'Healthtech', 'Edtech', 'E-commerce', 'AI/ML', 'Deep Tech', 'Clean Tech', 'Other']
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
angelInvestorSchema.index({ name: 'text', city: 'text', country: 'text' });

module.exports = mongoose.model('AngelInvestor', angelInvestorSchema);