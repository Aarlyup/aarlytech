const Accelerator = require('../models/Accelerator');
const { validationResult } = require('express-validator');

// Get all accelerators with filtering and pagination
exports.getAccelerators = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      affiliation,
      applicationStatus,
      tags,
      equityRange,
      fundingRange,
      durationRange
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (affiliation) {
      filter.affiliation = { $in: affiliation.split(',') };
    }

    if (applicationStatus) {
      filter.application_status = { $in: applicationStatus.split(',') };
    }

    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    // Execute query with pagination
    const accelerators = await Accelerator.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Accelerator.countDocuments(filter);

    res.json({
      accelerators,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single accelerator
exports.getAccelerator = async (req, res) => {
  try {
    const accelerator = await Accelerator.findById(req.params.id);
    
    if (!accelerator) {
      return res.status(404).json({ message: 'Accelerator not found' });
    }

    res.json(accelerator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create accelerator
exports.createAccelerator = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accelerator = new Accelerator(req.body);
    const savedAccelerator = await accelerator.save();
    
    res.status(201).json(savedAccelerator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update accelerator
exports.updateAccelerator = async (req, res) => {
  try {
    const accelerator = await Accelerator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!accelerator) {
      return res.status(404).json({ message: 'Accelerator not found' });
    }

    res.json(accelerator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete accelerator
exports.deleteAccelerator = async (req, res) => {
  try {
    const accelerator = await Accelerator.findByIdAndDelete(req.params.id);

    if (!accelerator) {
      return res.status(404).json({ message: 'Accelerator not found' });
    }

    res.json({ message: 'Accelerator deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};