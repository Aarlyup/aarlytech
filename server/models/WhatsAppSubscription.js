const mongoose = require('mongoose');

const whatsAppSubscriptionSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  optOutToken: {
    type: String,
    unique: true,
    sparse: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  lastMessageSent: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Generate opt-out token before saving
whatsAppSubscriptionSchema.pre('save', function(next) {
  if (!this.optOutToken) {
    this.optOutToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  next();
});

module.exports = mongoose.model('WhatsAppSubscription', whatsAppSubscriptionSchema);