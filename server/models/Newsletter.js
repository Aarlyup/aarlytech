const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'sending', 'completed', 'failed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Newsletter', newsletterSchema);