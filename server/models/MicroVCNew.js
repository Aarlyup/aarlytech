const mongoose = require('mongoose');

const microVCSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  checkSize: {
    type: Number,
    required: true
  },
  stage: [{
    type: String,
    enum: ['Pre-seed', 'Seed', 'Series A']
  }],
  sector: [{
    type: String,
    enum: ['Deeptech', 'B2B SaaS', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'AI/ML', 'Clean Tech', 'Other']
  }],
  contact: {
    type: String,
    required: true
  },
  portfolioHighlights: {
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
microVCSchema.index({ name: 'text', location: 'text' });

module.exports = mongoose.model('MicroVCNew', microVCSchema);