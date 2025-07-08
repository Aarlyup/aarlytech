const WhatsAppSubscription = require('../models/WhatsAppSubscription');
const WhatsAppMessage = require('../models/WhatsAppMessage');
const User = require('../models/User');
const whatsappService = require('../config/whatsapp');
const { validationResult } = require('express-validator');

// Subscribe to WhatsApp updates
exports.subscribeToWhatsApp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { phoneNumber } = req.body;
    const userId = req.user ? req.user._id : null;

    // Check if phone number already exists
    const existingSubscription = await WhatsAppSubscription.findOne({ phoneNumber });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This phone number is already subscribed to WhatsApp updates'
        });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.user = userId;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();
        
        return res.json({
          success: true,
          message: 'WhatsApp updates reactivated successfully'
        });
      }
    }

    // Create new subscription
    const subscription = new WhatsAppSubscription({
      phoneNumber,
      user: userId
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to WhatsApp updates'
    });
  } catch (error) {
    console.error('WhatsApp subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to WhatsApp updates'
    });
  }
};

// Opt out from WhatsApp updates
exports.optOutFromWhatsApp = async (req, res) => {
  try {
    const { token } = req.params;

    const subscription = await WhatsAppSubscription.findOne({ optOutToken: token });
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Invalid opt-out token'
      });
    }

    await WhatsAppSubscription.findByIdAndDelete(subscription._id);

    res.json({
      success: true,
      message: 'Successfully opted out from WhatsApp updates'
    });
  } catch (error) {
    console.error('WhatsApp opt-out error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to opt out from WhatsApp updates'
    });
  }
};

// Get all WhatsApp subscriptions (Admin)
exports.getWhatsAppSubscriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const filter = { isActive: true };
    if (search) {
      filter.phoneNumber = { $regex: search, $options: 'i' };
    }

    const subscriptions = await WhatsAppSubscription.find(filter)
      .populate('user', 'name email')
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WhatsAppSubscription.countDocuments(filter);

    res.json({
      success: true,
      data: subscriptions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get WhatsApp subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send WhatsApp message to all subscribers (Admin)
exports.sendWhatsAppMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { message, selectedNumbers } = req.body;

    // Get subscribers
    let subscriptions;
    if (selectedNumbers && selectedNumbers.length > 0) {
      subscriptions = await WhatsAppSubscription.find({
        phoneNumber: { $in: selectedNumbers },
        isActive: true
      });
    } else {
      subscriptions = await WhatsAppSubscription.find({ isActive: true });
    }

    if (subscriptions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active WhatsApp subscriptions found'
      });
    }

    // Create message record
    const whatsAppMessage = new WhatsAppMessage({
      message,
      sentBy: req.user._id,
      recipientCount: subscriptions.length,
      status: 'sending'
    });

    await whatsAppMessage.save();

    // Simulate sending WhatsApp messages with delay
    const sendWithDelay = async (subscriptions) => {
      let successCount = 0;
      let failureCount = 0;
      
      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        
        try {
          // Format phone number
          const formattedNumber = whatsappService.formatPhoneNumber(subscription.phoneNumber);
          
          // Add opt-out instructions to the message
          const fullMessage = `${message}\n\n---\nTo stop receiving updates, visit: ${process.env.FRONTEND_URL}/whatsapp/opt-out/${subscription.optOutToken}`;
          
          // Send WhatsApp message using the service
          const result = await whatsappService.sendMessage(formattedNumber, fullMessage);
          
          if (result.success) {
            // Update last message sent
            subscription.lastMessageSent = new Date();
            await subscription.save();
            successCount++;
          } else {
            console.error(`Failed to send WhatsApp message to ${subscription.phoneNumber}:`, result.error);
            failureCount++;
          }
        } catch (error) {
          console.error(`Failed to send WhatsApp message to ${subscription.phoneNumber}:`, error);
          failureCount++;
        }
        
        // Wait 1 second between messages to respect rate limits
        if (i < subscriptions.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Update message status
      whatsAppMessage.status = failureCount === subscriptions.length ? 'failed' : 'completed';
      whatsAppMessage.successCount = successCount;
      whatsAppMessage.failureCount = failureCount;
      await whatsAppMessage.save();
      
      console.log(`WhatsApp message sent to ${successCount} numbers with ${failureCount} failures`);
    };

    // Start sending messages in the background
    sendWithDelay(subscriptions).catch(error => {
      console.error('Error in sendWithDelay:', error);
    });

    // Respond immediately
    res.json({
      success: true,
      message: `WhatsApp message is being sent to ${subscriptions.length} subscribers`,
      data: {
        id: whatsAppMessage._id,
        recipientCount: subscriptions.length
      }
    });
  } catch (error) {
    console.error('Send WhatsApp message error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get WhatsApp messages history (Admin)
exports.getWhatsAppMessages = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const messages = await WhatsAppMessage.find()
      .populate('sentBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WhatsAppMessage.countDocuments();

    res.json({
      success: true,
      data: messages,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get WhatsApp messages error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete WhatsApp subscription (Admin)
exports.deleteWhatsAppSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subscription = await WhatsAppSubscription.findById(id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'WhatsApp subscription not found'
      });
    }

    await WhatsAppSubscription.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'WhatsApp subscription deleted successfully'
    });
  } catch (error) {
    console.error('Delete WhatsApp subscription error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get WhatsApp configuration status (Admin)
exports.getWhatsAppConfig = async (req, res) => {
  try {
    const phoneInfo = await whatsappService.getPhoneNumberInfo();
    
    res.json({
      success: true,
      data: {
        configured: !!process.env.WHATSAPP_ACCESS_TOKEN && !!process.env.WHATSAPP_PHONE_NUMBER_ID,
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
        phoneInfo: phoneInfo.success ? phoneInfo.data : null,
        apiVersion: process.env.WHATSAPP_API_VERSION || 'v18.0'
      }
    });
  } catch (error) {
    console.error('Get WhatsApp config error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Test WhatsApp configuration (Admin)
exports.testWhatsAppConfig = async (req, res) => {
  try {
    const { testPhoneNumber } = req.body;
    
    if (!testPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Test phone number is required'
      });
    }

    const testMessage = 'This is a test message from Aarly WhatsApp system. Configuration is working correctly!';
    const result = await whatsappService.sendMessage(testPhoneNumber, testMessage);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Test message sent successfully',
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to send test message',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test WhatsApp config error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
