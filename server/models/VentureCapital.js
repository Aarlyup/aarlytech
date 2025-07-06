const mongoose = require('mongoose');

const ventureCapitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    default: ''
  },
  headOffice: {
    type: String,
    required: true,
    trim: true
  },
  fundSize: {
    type: Number,
    required: true
  },
  stageFocus: [{
    type: String,
    enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth']
  }],
  sectorFocus: [{
    type: String,
    enum: ['SaaS', 'Fintech', 'D2C', 'Healthtech', 'Edtech', 'E-commerce', 'AI/ML', 'Deep Tech', 'Clean Tech', 'Other']
  }],
  avgTicketSize: {
    type: Number,
    required: true
  },
  applicationProcess: {
    type: String,
    enum: ['Warm intro', 'Direct pitch', 'Online application', 'Referral only'],
    default: 'Direct pitch'
  },
  contact: {
    type: String,
    required: true
  },
  portfolioHighlights: {
    type: String,
    default: ''
  },
  investmentThesis: {
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
ventureCapitalSchema.index({ name: 1, headOffice: 1 });

module.exports = mongoose.model('VentureCapital', ventureCapitalSchema);