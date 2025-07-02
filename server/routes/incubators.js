const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getIncubators,
  getIncubator,
  createIncubator,
  updateIncubator,
  deleteIncubator
} = require('../controllers/incubatorController');

// Validation rules
const incubatorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('affiliation').isIn(['Govt-backed', 'Private', 'University-backed']).withMessage('Invalid affiliation'),
  body('application_status').isIn(['Open', 'Closed']).withMessage('Invalid application status'),
];

// Routes
router.get('/', getIncubators);
router.get('/:id', getIncubator);
router.post('/', incubatorValidation, createIncubator);
router.put('/:id', incubatorValidation, updateIncubator);
router.delete('/:id', deleteIncubator);

module.exports = router;