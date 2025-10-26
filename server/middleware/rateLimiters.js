const rateLimit = require('express-rate-limit');

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Contact form rate limiter - 3 submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again in an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// WhatsApp subscribe rate limiter - 3 attempts per hour per IP
const whatsappLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many WhatsApp subscription attempts. Please try again in an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter - for login attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  contactLimiter,
  authLimiter,
  whatsappLimiter
};
