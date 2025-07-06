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

// Get all items for a category (Admin)
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
    console.error('Get funding items error:', error);
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
    console.error('Get funding item error:', error);
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

    // Process the data based on category
    const processedData = { ...req.body };
    
    // Convert comma-separated strings to arrays for specific fields
    const arrayFields = {
      'angel-investors': ['investCategory', 'stage'],
      'venture-capital': ['stageFocus', 'sectorFocus'],
      'micro-vcs': ['stage', 'sector'],
      'incubators': [],
      'accelerators': ['stage', 'sectors'],
      'govt-grants': ['stage', 'documentsRequired']
    };

    if (arrayFields[category]) {
      arrayFields[category].forEach(field => {
        if (processedData[field] && typeof processedData[field] === 'string') {
          processedData[field] = processedData[field].split(',').map(s => s.trim()).filter(Boolean);
        }
      });
    }

    // Convert numeric fields
    const numericFields = {
      'angel-investors': ['ticketSize'],
      'venture-capital': ['fundSize', 'avgTicketSize'],
      'micro-vcs': ['fundSize', 'checkSize'],
      'incubators': [],
      'accelerators': [],
      'govt-grants': ['grantSize']
    };

    if (numericFields[category]) {
      numericFields[category].forEach(field => {
        if (processedData[field]) {
          processedData[field] = Number(processedData[field]);
        }
      });
    }

    const item = new Model(processedData);
    await item.save();

    res.status(201).json({
      success: true,
      data: item,
      message: 'Item created successfully'
    });
  } catch (error) {
    console.error('Create funding item error:', error);
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

    // Process the data same as create
    const processedData = { ...req.body };
    
    const arrayFields = {
      'angel-investors': ['investCategory', 'stage'],
      'venture-capital': ['stageFocus', 'sectorFocus'],
      'micro-vcs': ['stage', 'sector'],
      'incubators': [],
      'accelerators': ['stage', 'sectors'],
      'govt-grants': ['stage', 'documentsRequired']
    };

    if (arrayFields[category]) {
      arrayFields[category].forEach(field => {
        if (processedData[field] && typeof processedData[field] === 'string') {
          processedData[field] = processedData[field].split(',').map(s => s.trim()).filter(Boolean);
        }
      });
    }

    const numericFields = {
      'angel-investors': ['ticketSize'],
      'venture-capital': ['fundSize', 'avgTicketSize'],
      'micro-vcs': ['fundSize', 'checkSize'],
      'incubators': [],
      'accelerators': [],
      'govt-grants': ['grantSize']
    };

    if (numericFields[category]) {
      numericFields[category].forEach(field => {
        if (processedData[field]) {
          processedData[field] = Number(processedData[field]);
        }
      });
    }

    const item = await Model.findByIdAndUpdate(
      id,
      processedData,
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
    console.error('Update funding item error:', error);
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
    console.error('Delete funding item error:', error);
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
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category-specific filters
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        if (Array.isArray(filters[key])) {
          filter[key] = { $in: filters[key] };
        } else if (typeof filters[key] === 'string' && filters[key].includes(',')) {
          filter[key] = { $in: filters[key].split(',') };
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
    console.error('Get public funding items error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
