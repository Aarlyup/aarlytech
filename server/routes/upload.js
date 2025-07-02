const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage, upload } = require('../controllers/uploadController');

// Upload image
router.post('/', upload.single('image'), uploadImage);

// Delete image
router.delete('/:public_id', deleteImage);

module.exports = router;