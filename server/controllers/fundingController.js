const AngelInvestor = require('../models/AngelInvestor');
const VentureCapital = require('../models/VentureCapital');
const MicroVCNew = require('../models/MicroVCNew');
const IncubatorNew = require('../models/IncubatorNew');
const AcceleratorNew = require('../models/AcceleratorNew');
const GovtGrant = require('../models/GovtGrant');
const { validationResult } = require('express-validator');

// Model mapping
const models = {
  'angel-investors': AngelInvestor,
  'venture-capital': VentureCapital,
  'micro-vcs': MicroVCNew,
  'incubators': IncubatorNew,
  'accelerators': AcceleratorNew,
  'govt-grants': GovtGrant
};

// Get all items for a category
exports.getFundingItems = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10, search } = req.query;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const filter = { isActive: true };
    if (search) {
      filter.$text = { $search: search };
    }

    const items = await Model.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Model.countDocuments(filter);

    res.json({
      success: true,
      data: items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single item
exports.getFundingItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const item = await Model.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new item
exports.createFundingItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { category } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const item = new Model(req.body);
    await item.save();

    res.status(201).json({
      success: true,
      data: item,
      message: 'Item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update item
exports.updateFundingItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const item = await Model.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item,
      message: 'Item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete item
exports.deleteFundingItem = async (req, res) => {
  try {
    const { category, id } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const item = await Model.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get public funding items (for user-facing pages)
exports.getPublicFundingItems = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, search, ...filters } = req.query;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const filter = { isActive: true };
    
    // Add search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Add category-specific filters
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        if (Array.isArray(filters[key])) {
          filter[key] = { $in: filters[key] };
        } else {
          filter[key] = { $regex: filters[key], $options: 'i' };
        }
      }
    });

    const items = await Model.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Model.countDocuments(filter);

    res.json({
      success: true,
      data: items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};