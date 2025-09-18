const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');
const {
  getFundingItems,
  getFundingItem,
  createFundingItem,
  updateFundingItem,
  deleteFundingItem,
  getPublicFundingItems
} = require('../controllers/fundingController');

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Validation rules for different categories
const angelInvestorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('ticketSize').isNumeric().withMessage('Ticket size must be a number'),
  body('currency').isIn(['INR', 'USD']).withMessage('Currency must be INR or USD'),
  body('contact').trim().notEmpty().withMessage('Contact is required')
];

const ventureCapitalValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('headOffice').trim().notEmpty().withMessage('Head office is required'),
  body('fundSize').isNumeric().withMessage('Fund size must be a number'),
  body('fundSizeCurrency').isIn(['INR', 'USD']).withMessage('Fund size currency must be INR or USD'),
  body('avgTicketSizeMin').isNumeric().withMessage('Average ticket size minimum must be a number'),
  body('avgTicketSizeMax').isNumeric().withMessage('Average ticket size maximum must be a number'),
  body('avgTicketSizeCurrency').isIn(['INR', 'USD']).withMessage('Average ticket size currency must be INR or USD'),
  body('contact').trim().notEmpty().withMessage('Contact is required')
];

const microVCValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('fundSize').isNumeric().withMessage('Fund size must be a number'),
  body('fundSizeCurrency').isIn(['INR', 'USD']).withMessage('Fund size currency must be INR or USD'),
  body('checkSize').isNumeric().withMessage('Check size must be a number'),
  body('checkSizeCurrency').isIn(['INR', 'USD']).withMessage('Check size currency must be INR or USD'),
  body('contact').trim().notEmpty().withMessage('Contact is required')
];

const incubatorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('fundingSupport').trim().notEmpty().withMessage('Funding support is required'),
  body('eligibility').trim().notEmpty().withMessage('Eligibility is required'),
  body('contact').trim().notEmpty().withMessage('Contact is required')
];

const acceleratorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('hq').trim().notEmpty().withMessage('HQ is required'),
  body('batchFrequency').trim().notEmpty().withMessage('Batch frequency is required'),
  body('fundingOffered').trim().notEmpty().withMessage('Funding offered is required'),
  body('programDuration').trim().notEmpty().withMessage('Program duration is required')
];

const govtGrantValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('authority').trim().notEmpty().withMessage('Authority is required'),
  body('grantSize').isNumeric().withMessage('Grant size must be a number'),
  body('currency').isIn(['INR', 'USD']).withMessage('Currency must be INR or USD'),
  body('eligibility').trim().notEmpty().withMessage('Eligibility is required'),
  body('howToApply').trim().notEmpty().withMessage('How to apply is required'),
  body('timelines').trim().notEmpty().withMessage('Timelines is required'),
  body('contact').trim().notEmpty().withMessage('Contact is required')
];

// Get validation for category
const getValidation = (category) => {
  switch (category) {
    case 'angel-investors': return angelInvestorValidation;
    case 'venture-capital': return ventureCapitalValidation;
    case 'micro-vcs': return microVCValidation;
    case 'incubators': return incubatorValidation;
    case 'accelerators': return acceleratorValidation;
    case 'govt-grants': return govtGrantValidation;
    default: return [];
  }
};

// Admin routes (protected)
router.get('/admin/:category', adminAuth, getFundingItems);
router.get('/admin/:category/:id', adminAuth, getFundingItem);
router.post('/admin/:category', adminAuth, upload.single('icon'), (req, res, next) => {
  const validation = getValidation(req.params.category);
  validation.forEach(rule => rule(req, res, () => {}));
  next();
}, createFundingItem);
router.put('/admin/:category/:id', adminAuth, upload.single('icon'), updateFundingItem);
router.delete('/admin/:category/:id', adminAuth, deleteFundingItem);
router.delete('/admin/:category/bulk/all', adminAuth, require('../controllers/fundingController').bulkDeleteFundingItems);

// Public routes (for user-facing pages)
router.get('/public/:category', getPublicFundingItems);
router.get('/public/:category/:id', getFundingItem);

module.exports = router;
