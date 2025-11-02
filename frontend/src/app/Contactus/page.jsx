"use client";
import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  User, 
  MailCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react';

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
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-black text-teal-100/50 select-none opacity-60">
              Contact
            </div>
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-teal-200">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? We're here to help. Send us a message and 
              let's create something amazing together.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MessageCircle className="w-7 h-7" />
                Get In Touch
              </h2>
              <p className="text-teal-100 leading-relaxed">
                We're always excited to hear about new projects and opportunities. 
                Let's discuss how we can help bring your vision to life.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <Phone className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-teal-600 font-medium">Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center">
                    <Mail className="w-7 h-7 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">hello@example.com</p>
                    <p className="text-sm text-cyan-600 font-medium">24/7 Support</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Visit Us</h3>
                    <p className="text-gray-600">123 Business Avenue</p>
                    <p className="text-sm text-blue-600 font-medium">Suite 100, City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 transform hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <MailCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Send Message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                    <label htmlFor="name" className="font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                      Your Name
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                             focus:border-teal-500 focus:ring-4 focus:ring-teal-50 focus:outline-none
                             hover:border-gray-300 placeholder-gray-400 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                    <label htmlFor="email" className="font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                      Email Address
                    </label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                             focus:border-teal-500 focus:ring-4 focus:ring-teal-50 focus:outline-none
                             hover:border-gray-300 placeholder-gray-400 bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                    <label htmlFor="message" className="font-semibold text-gray-700 transition-colors group-focus-within:text-teal-600">
                      Your Message
                    </label>
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-lg transition-all duration-300 
                             focus:border-teal-500 focus:ring-4 focus:ring-teal-50 focus:outline-none resize-none
                             hover:border-gray-300 placeholder-gray-400 bg-white"
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
                            } text-white flex items-center justify-center gap-3 group/btn`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Status Message */}
                {status && (
                  <div className={`p-4 rounded-xl transition-all duration-300 transform ${
                    status.includes('successfully') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : status.includes('Sending')
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {status.includes('successfully') ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : status.includes('Sending') ? (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      ) : (
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">!</span>
                        </div>
                      )}
                      <p className="font-semibold">{status}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Quick Response Time</h3>
                <p className="text-teal-100">We typically reply within 2-4 hours during business days</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">100% Satisfaction</h3>
                <p className="text-teal-100">Your satisfaction is our top priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;