const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminAuth = require('../middleware/adminAuth');
const {
  getNewsletters,
  getNewsletter,
  createNewsletter,
  sendNewsletter,
  deleteNewsletter,
  getUsersWithEmailPreferences,
  updateUserEmailPreference,
  batchUpdateEmailPreferences
} = require('../controllers/newsletterController');

// Validation rules
const newsletterValidation = [
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('body').trim().notEmpty().withMessage('Body content is required')
];

// Newsletter routes (admin only)
router.get('/', adminAuth, getNewsletters);
router.get('/:id', adminAuth, getNewsletter);
router.post('/', adminAuth, newsletterValidation, createNewsletter);
router.post('/:id/send', adminAuth, sendNewsletter);
router.delete('/:id', adminAuth, deleteNewsletter);

// User email preferences routes
router.get('/users/preferences', adminAuth, getUsersWithEmailPreferences);
router.put('/users/:userId/preference', adminAuth, updateUserEmailPreference);
router.put('/users/preferences/batch', adminAuth, batchUpdateEmailPreferences);

module.exports = router;