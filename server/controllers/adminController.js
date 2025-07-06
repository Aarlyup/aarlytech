const InvestorMatch = require('../models/InvestorMatch');
const News = require('../models/News');
const Contact = require('../models/Contact');
const cloudinary = require('../config/cloudinary');
const { sendEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

// ============ INVESTOR MATCH CONTROLLERS ============

// Get all investor matches
exports.getInvestorMatches = async (req, res) => {
  try {
    const { page = 1, limit = 10, stage, industry, traction } = req.query;
    
    const filter = { isActive: true };
    if (stage) filter.stage = stage;
    if (industry) filter.industry = { $regex: industry, $options: 'i' };
    if (traction) filter.traction = traction;

    const matches = await InvestorMatch.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await InvestorMatch.countDocuments(filter);

    res.json({
      success: true,
      data: matches,
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

// Create investor match
exports.createInvestorMatch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const match = new InvestorMatch(req.body);
    await match.save();

    res.status(201).json({
      success: true,
      data: match,
      message: 'Investor match created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update investor match
exports.updateInvestorMatch = async (req, res) => {
  try {
    const match = await InvestorMatch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Investor match not found'
      });
    }

    res.json({
      success: true,
      data: match,
      message: 'Investor match updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete investor match
exports.deleteInvestorMatch = async (req, res) => {
  try {
    const match = await InvestorMatch.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Investor match not found'
      });
    }

    res.json({
      success: true,
      message: 'Investor match deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============ NEWS CONTROLLERS ============

// Get all news
exports.getNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, isPublished } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const news = await News.find(filter)
      .populate('author', 'name email')
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
};

// Create news
exports.createNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    // Upload image to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'aarly/news',
      resource_type: 'auto',
    });

    const newsData = {
      ...req.body,
      image: {
        url: result.secure_url,
        publicId: result.public_id
      },
      author: req.user._id
    };

    const news = new News(newsData);
    await news.save();

    await news.populate('author', 'name email');

    res.status(201).json({
      success: true,
      data: news,
      message: 'News created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    let updateData = { ...req.body };

    // If new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (news.image.publicId) {
        await cloudinary.uploader.destroy(news.image.publicId);
      }

      // Upload new image
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'aarly/news',
        resource_type: 'auto',
      });

      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    res.json({
      success: true,
      data: updatedNews,
      message: 'News updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Delete image from Cloudinary
    if (news.image.publicId) {
      await cloudinary.uploader.destroy(news.image.publicId);
    }

    await News.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============ CONTACT CONTROLLERS ============

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const contacts = await Contact.find(filter)
      .populate('replies.sentBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
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

// Create contact (public endpoint)
exports.createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact message sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Reply to contact
exports.replyToContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Add reply to contact
    contact.replies.push({
      message,
      sentBy: req.user._id
    });
    contact.status = 'replied';
    await contact.save();

    // Send email reply
    const emailSubject = `Re: ${contact.subject}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Reply from Aarly Team</h2>
        <p>Dear ${contact.name},</p>
        <p>Thank you for contacting us. Here's our response to your inquiry:</p>
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <p style="margin: 0;">${message}</p>
        </div>
        <p>If you have any further questions, please don't hesitate to reach out.</p>
        <p>Best regards,<br>The Aarly Team</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          <strong>Original Message:</strong><br>
          <strong>Subject:</strong> ${contact.subject}<br>
          <strong>Message:</strong> ${contact.message}
        </p>
      </div>
    `;

    await sendEmail({
      to: contact.email,
      subject: emailSubject,
      html: emailHtml
    });

    await contact.populate('replies.sentBy', 'name email');

    res.json({
      success: true,
      data: contact,
      message: 'Reply sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, priority },
      { new: true, runValidators: true }
    ).populate('replies.sentBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};