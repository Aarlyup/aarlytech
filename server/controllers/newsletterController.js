const Newsletter = require('../models/Newsletter');
const User = require('../models/User');
const UserEmailPreference = require('../models/UserEmailPreference');
const { sendEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

// Get all newsletters (admin only)
exports.getNewsletters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const newsletters = await Newsletter.find()
      .populate('sentBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Newsletter.countDocuments();

    res.json({
      success: true,
      data: newsletters,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get newsletters error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single newsletter
exports.getNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id)
      .populate('sentBy', 'name email');
    
    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: 'Newsletter not found'
      });
    }

    res.json({
      success: true,
      data: newsletter
    });
  } catch (error) {
    console.error('Get newsletter error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create newsletter
exports.createNewsletter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { subject, body } = req.body;

    const newsletter = new Newsletter({
      subject,
      body,
      sentBy: req.user._id,
      status: 'draft'
    });

    await newsletter.save();

    res.status(201).json({
      success: true,
      data: newsletter,
      message: 'Newsletter created successfully'
    });
  } catch (error) {
    console.error('Create newsletter error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send newsletter
exports.sendNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;
    
    const newsletter = await Newsletter.findById(id);
    
    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: 'Newsletter not found'
      });
    }

    if (newsletter.status === 'sending' || newsletter.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'This newsletter has already been sent or is currently being sent'
      });
    }

    // Update newsletter status
    newsletter.status = 'sending';
    await newsletter.save();

    // Get users to send to
    let users;
    if (userIds && userIds.length > 0) {
      // Send to specific users
      users = await User.find({
        _id: { $in: userIds },
        isVerified: true,
        isActive: true
      }).select('name email');
    } else {
      // Send to all subscribed users
      const subscribedPreferences = await UserEmailPreference.find({ subscribed: true })
        .select('user');
      
      const subscribedUserIds = subscribedPreferences.map(pref => pref.user);
      
      users = await User.find({
        _id: { $in: subscribedUserIds },
        isVerified: true,
        isActive: true
      }).select('name email');
    }

    if (users.length === 0) {
      newsletter.status = 'failed';
      newsletter.recipientCount = 0;
      await newsletter.save();
      
      return res.status(400).json({
        success: false,
        message: 'No eligible recipients found'
      });
    }

    // Send emails with 1 second delay between each
    const sendWithDelay = async (users) => {
      let successCount = 0;
      let failCount = 0;
      
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        try {
          // Prepare email content
          const html = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${newsletter.subject}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🚀 Aarly Newsletter</h1>
                </div>
                <div class="content">
                  <h2>Hi ${user.name}!</h2>
                  ${newsletter.body}
                  <p>Best regards,<br>The Aarly Team</p>
                </div>
                <div class="footer">
                  <p>© 2025 Aarly. All rights reserved.</p>
                  <p>
                    <small>
                      If you no longer wish to receive these emails, you can 
                      <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(user.email)}">unsubscribe here</a>.
                    </small>
                  </p>
                </div>
              </div>
            </body>
            </html>
          `;

          await sendEmail({
            to: user.email,
            subject: newsletter.subject,
            html
          });
          
          successCount++;
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
          failCount++;
        }
        
        // Wait 1 second before sending the next email (Resend API rate limit)
        if (i < users.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      return { successCount, failCount };
    };

    // Start sending emails in the background
    sendWithDelay(users).then(async ({ successCount, failCount }) => {
      newsletter.status = failCount === users.length ? 'failed' : 'completed';
      newsletter.recipientCount = successCount;
      await newsletter.save();
      
      console.log(`Newsletter sent to ${successCount} users with ${failCount} failures`);
    }).catch(error => {
      console.error('Error in sendWithDelay:', error);
    });

    // Respond immediately
    res.json({
      success: true,
      message: `Newsletter is being sent to ${users.length} users`,
      data: {
        id: newsletter._id,
        subject: newsletter.subject,
        recipientCount: users.length
      }
    });
  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete newsletter
exports.deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: 'Newsletter not found'
      });
    }

    if (newsletter.status === 'sending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a newsletter that is currently being sent'
      });
    }

    await Newsletter.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Newsletter deleted successfully'
    });
  } catch (error) {
    console.error('Delete newsletter error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all users with email preferences
exports.getUsersWithEmailPreferences = async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = { isVerified: true };
    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const users = await User.find(query).select('_id name email lastLogin');
    
    // Get email preferences for all users
    const emailPreferences = await UserEmailPreference.find({
      user: { $in: users.map(user => user._id) }
    });
    
    // Create a map of user ID to subscription status
    const subscriptionMap = {};
    emailPreferences.forEach(pref => {
      subscriptionMap[pref.user.toString()] = pref.subscribed;
    });
    
    // Combine user data with subscription status
    const usersWithPreferences = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastLogin: user.lastLogin,
      subscribed: subscriptionMap[user._id.toString()] !== undefined 
        ? subscriptionMap[user._id.toString()] 
        : true // Default to true if no preference is set
    }));
    
    res.json({
      success: true,
      data: usersWithPreferences
    });
  } catch (error) {
    console.error('Get users with email preferences error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user email preferences
exports.updateUserEmailPreference = async (req, res) => {
  try {
    const { userId } = req.params;
    const { subscribed } = req.body;
    
    if (subscribed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Subscription status is required'
      });
    }
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update or create preference
    let preference = await UserEmailPreference.findOne({ user: userId });
    
    if (preference) {
      preference.subscribed = subscribed;
      preference.updatedAt = new Date();
    } else {
      preference = new UserEmailPreference({
        user: userId,
        subscribed
      });
    }
    
    await preference.save();
    
    res.json({
      success: true,
      data: {
        userId,
        subscribed
      },
      message: `User ${subscribed ? 'subscribed' : 'unsubscribed'} successfully`
    });
  } catch (error) {
    console.error('Update user email preference error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Batch update user email preferences
exports.batchUpdateEmailPreferences = async (req, res) => {
  try {
    const { userIds, subscribed } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'User IDs are required'
      });
    }
    
    if (subscribed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Subscription status is required'
      });
    }
    
    // Process each user
    const operations = userIds.map(userId => ({
      updateOne: {
        filter: { user: userId },
        update: { 
          $set: { 
            subscribed,
            updatedAt: new Date()
          } 
        },
        upsert: true
      }
    }));
    
    const result = await UserEmailPreference.bulkWrite(operations);
    
    res.json({
      success: true,
      message: `Updated ${result.modifiedCount + result.upsertedCount} user preferences`,
      data: {
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      }
    });
  } catch (error) {
    console.error('Batch update email preferences error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};