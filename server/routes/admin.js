const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminAuth = require('../middleware/adminAuth');
const { upload } = require('../controllers/uploadController');
const {
  // Investor Match
  getInvestorMatches,
  createInvestorMatch,
  updateInvestorMatch,
  deleteInvestorMatch,
  
  // News
  getNews,
  createNews,
  updateNews,
  deleteNews,
  
  // Contact
  getContacts,
  createContact,
  replyToContact,
  updateContactStatus
} = require('../controllers/adminController');

// Validation rules
const investorMatchValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('stage').isIn(['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+']).withMessage('Invalid stage'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('traction').isIn(['Idea', 'MVP', 'Users', 'Revenue', 'Profitable']).withMessage('Invalid traction'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('checkSize').trim().notEmpty().withMessage('Check size is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
];

const newsValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').optional().isIn(['Funding', 'Startup', 'Technology', 'Market', 'Policy']).withMessage('Invalid category'),
];

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// ============ INVESTOR MATCH ROUTES ============
router.get('/investor-matches', adminAuth, getInvestorMatches);
router.post('/investor-matches', adminAuth, investorMatchValidation, createInvestorMatch);
router.put('/investor-matches/:id', adminAuth, investorMatchValidation, updateInvestorMatch);
router.delete('/investor-matches/:id', adminAuth, deleteInvestorMatch);

// ============ NEWS ROUTES ============
router.get('/news', adminAuth, getNews);
router.post('/news', adminAuth, upload.single('image'), newsValidation, createNews);
router.put('/news/:id', adminAuth, upload.single('image'), updateNews);
router.delete('/news/:id', adminAuth, deleteNews);

// ============ CONTACT ROUTES ============
router.get('/contacts', adminAuth, getContacts);
router.post('/contacts/reply/:id', adminAuth, replyToContact);
router.put('/contacts/:id', adminAuth, updateContactStatus);

// Public contact endpoint (no auth required)
router.post('/contacts', contactValidation, createContact);

// Test endpoint to check admin access
router.get('/test', adminAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Admin access working',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

module.exports = router;