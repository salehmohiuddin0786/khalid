import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: '😊' },
    { number: '5+', label: 'Years Experience', icon: '⭐' },
    { number: '50+', label: 'Skilled Artisans', icon: '👨‍🎨' },
    { number: '100%', label: 'Quality Guarantee', icon: '✅' },
    { number: '5000+', label: 'Sarees Sold', icon: '👗' },
    { number: '24/7', label: 'Customer Support', icon: '💬' },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Authentic Craftsmanship',
      description: 'Each saree is handcrafted by skilled artisans with generations of expertise',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free delivery across India with easy returns within 7 days',
      gradient: 'from-blue-500 to-teal-500'
    },
    {
      icon: '🛡️',
      title: 'Quality Assurance',
      description: 'Rigorous quality checks to ensure perfection in every product',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💎',
      title: 'Premium Materials',
      description: 'Only the finest silks, cottons, and fabrics sourced ethically',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Express shipping options available for urgent occasions',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: '💝',
      title: 'Personal Styling',
      description: 'Free styling advice from our fashion experts',
      gradient: 'from-rose-500 to-red-500'
    },
  ];

  const milestones = [
    { year: '2018', event: 'Founded with a vision to revive traditional crafts' },
    { year: '2019', event: 'Launched first exclusive silk collection' },
    { year: '2020', event: 'Expanded to pan-India delivery' },
    { year: '2021', event: 'Won Best Traditional Wear Award' },
    { year: '2022', event: 'Reached 5000+ happy customers' },
    { year: '2023', event: 'Launched sustainable fashion line' },
  ];

  const team = [
    {
      name: 'Khalid Ahmed',
      role: 'Founder & CEO',
      image: '/images/team/khalid.jpg',
      description: 'With over 15 years in textile industry, passionate about preserving Indian craftsmanship',
      social: { linkedin: '#', instagram: '#' }
    },
    {
      name: 'Priya Sharma',
      role: 'Head Designer',
      image: '/images/team/priya.jpg',
      description: 'National award-winning designer with expertise in traditional Indian textiles',
      social: { linkedin: '#', instagram: '#' }
    },
    {
      name: 'Arjun Patel',
      role: 'Artisan Relations',
      image: '/images/team/arjun.jpg',
      description: 'Dedicated to ensuring fair wages and working conditions for all artisans',
      social: { linkedin: '#', instagram: '#' }
    },
  ];

  const certifications = [
    { name: 'Handloom Mark', icon: '🏷️' },
    { name: 'Silk Mark', icon: '🪡' },
    { name: 'Fair Trade', icon: '🤝' },
    { name: 'Eco-Friendly', icon: '🌱' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/20 to-teal-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-teal-600 via-purple-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8">
            <span className="text-sm font-semibold">🎉 Trusted by 10,000+ Customers Worldwide</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Weaving <span className="text-amber-300">Dreams</span>,<br />Preserving <span className="text-amber-300">Heritage</span>
          </h1>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto mb-8 opacity-95 leading-relaxed">
            Where Traditional Craftsmanship Meets Contemporary Elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/collection"
              className="group px-10 py-5 bg-white text-teal-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl text-lg"
            >
              Explore Our Collection
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="group px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-50/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-100 to-amber-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Timeline */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-2xl font-bold mb-6">
                Our Journey
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                A Legacy of <span className="text-transparent bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text">Excellence</span> in Every Thread
              </h2>
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                From a small workshop in Varanasi to becoming a trusted name in traditional wear, 
                our journey has been woven with passion, dedication, and an unwavering commitment to quality.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg">
                    <span className="text-2xl">{cert.icon}</span>
                    <span className="font-semibold text-gray-800">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-12 group">
                  <div className="absolute left-0 top-2 w-8 h-8 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-teal-500">
                    <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                    <p className="text-gray-700 text-lg leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-transparent bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text">Choose Us</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just selling sarees; we're delivering experiences, building trust, and creating memories that last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center text-3xl text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50/50 to-amber-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-transparent bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text">Dream Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the finest traditional wear experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 text-center"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-amber-400 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl">
                      👤
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-teal-600 font-semibold text-lg mb-3">{member.role}</div>
                <p className="text-gray-600 leading-relaxed mb-6">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300">
                    <span className="text-lg">📱</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <span className="text-lg">💼</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-purple-600 to-amber-600"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Experience <span className="text-amber-300">Magic</span>?
          </h2>
          <p className="text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Join our family of 10,000+ satisfied customers and discover why we're the most trusted name in traditional fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/collection"
              className="group px-12 py-6 bg-white text-teal-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-2 shadow-2xl hover:shadow-3xl text-xl min-w-60"
            >
              🛍️ Shop Collection
            </Link>
            <Link
              href="/contact"
              className="group px-12 py-6 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 text-xl min-w-60"
            >
              💬 Free Consultation
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✅</span>
              <span>Quality Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;