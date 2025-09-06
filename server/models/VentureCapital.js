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
  fundSizeCurrency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  stageFocus: [{
    type: String,
    enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth']
  }],
  sectorFocus: [{
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
  avgTicketSize: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  avgTicketSizeCurrency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
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
