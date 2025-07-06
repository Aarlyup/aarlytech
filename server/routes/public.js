const express = require('express');
const router = express.Router();
const InvestorMatch = require('../models/InvestorMatch');
const News = require('../models/News');

// Get investor matches for public (user) access
router.get('/investor-matches', async (req, res) => {
  try {
    const { stage, industry, traction } = req.query;
    
    const filter = { isActive: true };
    if (stage) filter.stage = stage;
    if (industry) filter.industry = { $regex: industry, $options: 'i' };
    if (traction) filter.traction = traction;

    const matches = await InvestorMatch.find(filter)
      .select('-isActive -createdAt -updatedAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get published news for public access
router.get('/news', async (req, res) => {
  try {
    const { page = 1, limit = 12, category } = req.query;
    
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const news = await News.find(filter)
      .populate('author', 'name')
      .select('-author.email')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await News.countDocuments(filter);

    res.json({
      success: true,
      data: news,
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
});

// Get single news article
router.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findOne({ 
      _id: req.params.id, 
      isPublished: true 
    }).populate('author', 'name');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;