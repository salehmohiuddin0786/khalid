"use client";
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('Message sent successfully! 🎉');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12 transform hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block mb-3 font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                         focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none
                         hover:border-gray-300 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block mb-3 font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                         focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none
                         hover:border-gray-300 placeholder-gray-400"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="block mb-3 font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                         focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none resize-none
                         hover:border-gray-300 placeholder-gray-400"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105
                        ${isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                        } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </div>
              ) : (
                'Send Message'
              )}
            </button>

            {/* Status Message */}
            {status && (
              <div className={`text-center p-4 rounded-xl transition-all duration-300 ${
                status.includes('successfully') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : status.includes('Sending')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <p className="font-semibold">{status}</p>
              </div>
            )}
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600">hello@example.com</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Business Ave, City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;