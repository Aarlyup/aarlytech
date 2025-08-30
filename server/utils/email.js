const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

const sendVerificationEmail = async (email, otp, name) => {
  const subject = 'Verify Your Aarly Account';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px solid #3b82f6; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
        .otp-code { font-size: 32px; font-weight: bold; color: #3b82f6; letter-spacing: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Welcome to Aarly!</h1>
          <p>Your startup funding journey begins here</p>
        </div>
        <div class="content">
          <h2>Hi ${name}!</h2>
          <p>Thank you for signing up with Aarly. To complete your registration and start discovering funding opportunities, please verify your email address.</p>
          
          <div class="otp-box">
            <p><strong>Your verification code:</strong></p>
            <div class="otp-code">${otp}</div>
            <p><small>This code expires in 15 minutes</small></p>
          </div>
          
          <p>Enter this code on the verification page to activate your account and gain access to:</p>
          <ul>
            <li>300+ Investors and VCs database</li>
            <li>Grants and schemes</li>
            <li>Accelerators and incubators</li>
            <li>Investor matching tools</li>
            <li>Funding resources and templates</li>
          </ul>
          
          <p>If you didn't create an account with Aarly, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Aarly. All rights reserved.</p>
          <p>Need help? Contact us at teamaarly@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({ to: email, subject, html });
};

const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Aarly - Your Funding Journey Starts Now! 🎉';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Aarly</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f0fdf4; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature-box { background: white; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Account Verified Successfully!</h1>
          <p>Welcome to the Aarly community, ${name}!</p>
        </div>
        <div class="content">
          <h2>You're all set! 🚀</h2>
          <p>Your email has been verified and your Aarly account is now active. You now have full access to our comprehensive funding discovery platform.</p>
          
          <h3>What you can do now:</h3>
          
          <div class="feature-box">
            <h4>🔍 Discover Funding Opportunities</h4>
            <p>Browse 300+ investors, VCs, accelerators, and grants tailored for your startup stage and sector.</p>
          </div>
          
          <div class="feature-box">
            <h4>🎯 Smart Investor Matching</h4>
            <p>Use our AI-powered matching tool to find investors who are most likely to fund your startup.</p>
          </div>
          
          <div class="feature-box">
            <h4>📚 Access Premium Resources</h4>
            <p>Download pitch deck templates, investor outreach scripts, and funding guides.</p>
          </div>
          
          <div class="feature-box">
            <h4>📰 Stay Updated</h4>
            <p>Get the latest funding news and opportunities delivered to your dashboard.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Start Exploring →</a>
          </div>
          
          <p><strong>Pro Tips for Success:</strong></p>
          <ul>
            <li>Complete your startup profile for better investor matches</li>
            <li>Follow investors on LinkedIn before reaching out</li>
            <li>Use our templates to craft compelling pitch emails</li>
            <li>Join our community Slack for peer support</li>
          </ul>
          
          <p>Questions? We're here to help! Reply to this email or reach out to our support team.</p>
          
          <p>Happy fundraising!</p>
          <p><strong>The Aarly Team</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Aarly. All rights reserved.</p>
          <p>Pilani, Rajasthan, India | teamaarly@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({ to: email, subject, html });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendWelcomeEmail
};
