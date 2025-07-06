import React, { useState } from 'react';
import { Linkedin, Instagram, Twitter, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-8 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 sm:mb-2 text-center text-gray-900">Contact Us</h1>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">We'd love to hear from you! Fill out the form below or reach out via social media.</p>
        {submitted && (
          <div className="flex items-center gap-2 mb-4 sm:mb-6 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm justify-center animate-fade-in">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Message sent! We'll get back to you soon.
          </div>
        )}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm sm:text-base" 
            required 
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm sm:text-base" 
            required 
          />
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject" 
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm sm:text-base" 
            required 
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm sm:text-base resize-none" 
            rows={4} 
            required 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md transition-colors text-base sm:text-lg"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-gray-500 mb-2 sm:mb-3 text-sm sm:text-base">Or connect with us:</p>
          <div className="flex justify-center space-x-6 sm:space-x-8 mb-2 sm:mb-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-transform hover:scale-110"><Linkedin size={28} className="sm:w-8 sm:h-8" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-transform hover:scale-110"><Instagram size={28} className="sm:w-8 sm:h-8" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-110"><Twitter size={28} className="sm:w-8 sm:h-8" /></a>
          </div>
          <div className="text-gray-500 text-xs sm:text-base break-words">
            <div>Email: <a href="mailto:hello@aarly.co" className="underline hover:text-blue-700">hello@aarly.co</a></div>
            {/* <div>Phone: <a href="tel:+911234567890" className="underline hover:text-blue-700">+91 12345 67890</a></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;