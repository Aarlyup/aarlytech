const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getMicroVCs,
  getMicroVC,
  createMicroVC,
  updateMicroVC,
  deleteMicroVC
} = require('../controllers/microvcController');

// Validation rules
const microvcValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('focus').isIn(['Pre-seed', 'Seed', 'Series A']).withMessage('Invalid focus'),
  body('cheque_size').trim().notEmpty().withMessage('Cheque size is required'),
  body('sectors').isArray({ min: 1 }).withMessage('At least one sector is required'),
];

// Routes
router.get('/', getMicroVCs);
router.get('/:id', getMicroVC);
router.post('/', microvcValidation, createMicroVC);
router.put('/:id', microvcValidation, updateMicroVC);
router.delete('/:id', deleteMicroVC);

module.exports = router;