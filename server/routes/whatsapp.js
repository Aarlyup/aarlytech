const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, optionalAuth } = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { whatsappLimiter } = require('../middleware/rateLimiters');
const {
  subscribeToWhatsApp,
  optOutFromWhatsApp,
  getWhatsAppSubscriptions,
  sendWhatsAppMessage,
  getWhatsAppMessages,
  deleteWhatsAppSubscription,
  getWhatsAppConfig,
  testWhatsAppConfig
} = require('../controllers/whatsappController');

// Validation rules
const subscribeValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please enter a valid phone number with country code')
];

const messageValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
];

// Public routes
// Apply whatsappLimiter to limit subscribe attempts to 3 per IP per hour
router.post('/subscribe', optionalAuth, whatsappLimiter, subscribeValidation, subscribeToWhatsApp);
router.get('/opt-out/:token', optOutFromWhatsApp);

// Admin routes
router.get('/admin/subscriptions', adminAuth, getWhatsAppSubscriptions);
router.post('/admin/send-message', adminAuth, messageValidation, sendWhatsAppMessage);
router.get('/admin/messages', adminAuth, getWhatsAppMessages);
router.delete('/admin/subscriptions/:id', adminAuth, deleteWhatsAppSubscription);
router.get('/admin/config', adminAuth, getWhatsAppConfig);
router.post('/admin/test-config', adminAuth, testWhatsAppConfig);

module.exports = router;
