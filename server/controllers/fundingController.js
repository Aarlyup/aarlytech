const AngelInvestor = require('../models/AngelInvestor');
const VentureCapital = require('../models/VentureCapital');
const MicroVCNew = require('../models/MicroVCNew');
const IncubatorNew = require('../models/IncubatorNew');
const AcceleratorNew = require('../models/AcceleratorNew');
const GovtGrant = require('../models/GovtGrant');
const { validationResult } = require('express-validator');
const cloudinary = require('../config/cloudinary');

// Model mapping
const models = {
  'angel-investors': AngelInvestor,
  'venture-capital': VentureCapital,
  'micro-vcs': MicroVCNew,
  'incubators': IncubatorNew,
  'accelerators': AcceleratorNew,
  'govt-grants': GovtGrant,
  'investor-matches': require('../models/InvestorMatch')
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
    console.log('Create funding item request body:', JSON.stringify(req.body));
    console.log('Category:', req.params.category);
    console.log('Request body type:', typeof req.body);
    
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
    let processedData = { ...req.body };
    console.log('Initial processed data (before processing):', JSON.stringify(processedData));
    
    try {
      // Convert comma-separated strings to arrays for specific fields
      const arrayFields = {
        'angel-investors': ['investCategory', 'stage'],
        'venture-capital': ['stageFocus', 'sectorFocus'],
        'micro-vcs': ['stage', 'sector'],
        'incubators': [],
        'accelerators': ['stage', 'sectors'],
        'govt-grants': ['stage', 'documentsRequired']
      };
        
      // Process array fields
      if (arrayFields[category]) {
        arrayFields[category].forEach(field => {
          // If the field doesn't exist, initialize as empty array
          if (processedData[field] === undefined || processedData[field] === null) {
            processedData[field] = [];
          } 
          // If it's a string, split it into an array
          else if (typeof processedData[field] === 'string' && processedData[field].trim() !== '') {
            processedData[field] = processedData[field].split(',').map(s => s.trim()).filter(Boolean);
          }
          // If it's already an array, keep it as is
        });
      }
    } catch (error) {
      console.error('Error processing array fields:', error);
    }

    // Convert numeric fields
    const numericFields = {
      'angel-investors': ['ticketSize'],
      'venture-capital': ['fundSize'], // avgTicketSize handled separately as range
      'micro-vcs': ['fundSize', 'checkSize'], 
      'incubators': [],
      'accelerators': [],
      'govt-grants': ['grantSize']
    };

    // Process numeric fields
    if (numericFields[category] && numericFields[category].length > 0) {
      numericFields[category].forEach(field => {
        if (processedData[field] !== undefined && processedData[field] !== null) {
          processedData[field] = Number(processedData[field]);
        } else {
          processedData[field] = 0; // Default to 0 if not provided
        }
      });
    }

    // Special processing for venture capital avgTicketSize range
    if (category === 'venture-capital') {
      if (processedData.avgTicketSizeMin !== undefined && processedData.avgTicketSizeMax !== undefined) {
        processedData.avgTicketSize = {
          min: Number(processedData.avgTicketSizeMin),
          max: Number(processedData.avgTicketSizeMax)
        };
        // Remove the temporary fields
        delete processedData.avgTicketSizeMin;
        delete processedData.avgTicketSizeMax;
      }
    }

    console.log('Final processed data (after processing):', JSON.stringify(processedData));

    // Handle icon upload if file is provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `funding-icons/${category}`,
          public_id: `${category}_${Date.now()}`,
          resource_type: 'image',
          transformation: [
            { width: 128, height: 128, crop: 'fill' },
            { quality: 'auto' }
          ]
        });
        
        processedData.icon = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (uploadError) {
        console.error('Icon upload error:', uploadError);
        // Continue without icon if upload fails
      }
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
    console.log('Update funding item request body:', JSON.stringify(req.body));
    
    console.log('Category:', req.params.category);
    console.log('ID:', req.params.id);
    
    const { category, id } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Process the data same as create function
    let processedData = { ...req.body };
    
    console.log('Initial processed data for update:', JSON.stringify(processedData));
    
    try {
      const arrayFields = {
        'angel-investors': ['investCategory', 'stage'],
        'venture-capital': ['stageFocus', 'sectorFocus'],
        'micro-vcs': ['stage', 'sector'],
        'incubators': [],
        'accelerators': ['stage', 'sectors'],
        'govt-grants': ['stage', 'documentsRequired']
      };
        
      // Process array fields
      if (arrayFields[category]) {
        arrayFields[category].forEach(field => {
          // If the field doesn't exist, initialize as empty array
          if (processedData[field] === undefined || processedData[field] === null) {
            processedData[field] = [];
          } 
          // If it's a string, split it into an array
          else if (typeof processedData[field] === 'string') {
            processedData[field] = processedData[field].split(',').map(s => s.trim()).filter(Boolean);
          }
        });
      }
    } catch (error) {
      console.error('Error processing array fields:', error);
    }

    const numericFields = { 
      'angel-investors': ['ticketSize'],
      'venture-capital': ['fundSize'], // avgTicketSize handled separately as range
      'micro-vcs': ['fundSize', 'checkSize'],
      'incubators': [],
      'accelerators': [],
      'govt-grants': ['grantSize']
    };

    if (numericFields[category] && numericFields[category].length > 0) { 
      numericFields[category].forEach(field => {
        if (processedData[field] !== undefined && processedData[field] !== null) {
          processedData[field] = Number(processedData[field]);
        } else {
          processedData[field] = 0; // Default to 0 if not provided
        }
      });
    }

    // Special processing for venture capital avgTicketSize range
    if (category === 'venture-capital') {
      if (processedData.avgTicketSizeMin !== undefined && processedData.avgTicketSizeMax !== undefined) {
        processedData.avgTicketSize = {
          min: Number(processedData.avgTicketSizeMin),
          max: Number(processedData.avgTicketSizeMax)
        };
        // Remove the temporary fields
        delete processedData.avgTicketSizeMin;
        delete processedData.avgTicketSizeMax;
      }
    }

    console.log('Final processed data for update:', JSON.stringify(processedData));

    // Handle icon upload if file is provided
    if (req.file) {
      try {
        // First get the existing item to delete old icon if exists
        const existingItem = await Model.findById(id);
        if (existingItem && existingItem.icon && existingItem.icon.publicId) {
          await cloudinary.uploader.destroy(existingItem.icon.publicId);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `funding-icons/${category}`,
          public_id: `${category}_${Date.now()}`,
          resource_type: 'image',
          transformation: [
            { width: 128, height: 128, crop: 'fill' },
            { quality: 'auto' }
          ]
        });
        
        processedData.icon = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (uploadError) {
        console.error('Icon upload error:', uploadError);
        // Continue without icon update if upload fails
      }
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
    console.log('Delete funding item request params:', req.params);
    
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

// Bulk delete all items in a category
exports.bulkDeleteFundingItems = async (req, res) => {
  try {
    const { category } = req.params;
    
    const Model = models[category];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const result = await Model.deleteMany({});

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} items successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Bulk delete funding items error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
