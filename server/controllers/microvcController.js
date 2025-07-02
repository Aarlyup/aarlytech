const MicroVC = require('../models/MicroVC');
const { validationResult } = require('express-validator');

// Get all microvcs with filtering and pagination
exports.getMicroVCs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      focus,
      sectors,
      state
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (focus) {
      filter.focus = { $in: focus.split(',') };
    }

    if (sectors) {
      filter.sectors = { $in: sectors.split(',') };
    }

    if (state) {
      filter.location = { $regex: state.split(',').join('|'), $options: 'i' };
    }

    // Execute query with pagination
    const microvcs = await MicroVC.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await MicroVC.countDocuments(filter);

    res.json({
      microvcs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single microvc
exports.getMicroVC = async (req, res) => {
  try {
    const microvc = await MicroVC.findById(req.params.id);
    
    if (!microvc) {
      return res.status(404).json({ message: 'MicroVC not found' });
    }

    res.json(microvc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create microvc
exports.createMicroVC = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const microvc = new MicroVC(req.body);
    const savedMicroVC = await microvc.save();
    
    res.status(201).json(savedMicroVC);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update microvc
exports.updateMicroVC = async (req, res) => {
  try {
    const microvc = await MicroVC.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!microvc) {
      return res.status(404).json({ message: 'MicroVC not found' });
    }

    res.json(microvc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete microvc
exports.deleteMicroVC = async (req, res) => {
  try {
    const microvc = await MicroVC.findByIdAndDelete(req.params.id);

    if (!microvc) {
      return res.status(404).json({ message: 'MicroVC not found' });
    }

    res.json({ message: 'MicroVC deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};