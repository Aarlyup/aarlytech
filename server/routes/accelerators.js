const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAccelerators,
  getAccelerator,
  createAccelerator,
  updateAccelerator,
  deleteAccelerator
} = require('../controllers/acceleratorController');

// Validation rules
const acceleratorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('affiliation').isIn(['Govt-backed', 'Corporate', 'Independent']).withMessage('Invalid affiliation'),
  body('application_status').isIn(['Open', 'Closed']).withMessage('Invalid application status'),
  body('batch_frequency').trim().notEmpty().withMessage('Batch frequency is required'),
  body('equity_taken').trim().notEmpty().withMessage('Equity taken is required'),
  body('funding_offered').trim().notEmpty().withMessage('Funding offered is required'),
  body('duration_weeks').isInt({ min: 1 }).withMessage('Duration must be at least 1 week'),
];

// Routes
router.get('/', getAccelerators);
router.get('/:id', getAccelerator);
router.post('/', acceleratorValidation, createAccelerator);
router.put('/:id', acceleratorValidation, updateAccelerator);
router.delete('/:id', deleteAccelerator);

module.exports = router;