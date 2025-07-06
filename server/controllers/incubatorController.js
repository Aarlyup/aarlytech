const Incubator = require('../models/IncubatorNew');
const { validationResult } = require('express-validator');

// Get all incubators with filtering and pagination
exports.getIncubators = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      location,
      fundingSupport,
      eligibility
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (location) {
      filter.location = { $in: location.split(',') };
    }

    if (fundingSupport) {
      filter.fundingSupport = { $regex: fundingSupport, $options: 'i' };
    }

    if (eligibility) {
      filter.eligibility = { $regex: eligibility, $options: 'i' };
    }

    // Execute query with pagination
    const incubators = await Incubator.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Incubator.countDocuments(filter);

    res.json({
      incubators,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single incubator
exports.getIncubator = async (req, res) => {
  try {
    const incubator = await Incubator.findById(req.params.id);
    
    if (!incubator) {
      return res.status(404).json({ message: 'Incubator not found' });
    }

    res.json(incubator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create incubator
exports.createIncubator = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const incubator = new Incubator(req.body);
    const savedIncubator = await incubator.save();
    
    res.status(201).json(savedIncubator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update incubator
exports.updateIncubator = async (req, res) => {
  try {
    const incubator = await Incubator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!incubator) {
      return res.status(404).json({ message: 'Incubator not found' });
    }

    res.json(incubator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete incubator
exports.deleteIncubator = async (req, res) => {
  try {
    const incubator = await Incubator.findByIdAndDelete(req.params.id);

    if (!incubator) {
      return res.status(404).json({ message: 'Incubator not found' });
    }

    res.json({ message: 'Incubator deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
