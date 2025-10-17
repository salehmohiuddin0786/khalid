"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    id: '1',
    title: 'Silk Sarees',
    description: 'Luxurious silk sarees with fine craftsmanship and intricate designs',
    imageUrl: '/images/silk-saree.jpg',
    items: '45+ Styles',
    priceRange: '₹2,499 - ₹15,999',
    badge: 'Bestseller',
    gradient: 'from-purple-500 to-pink-500',
    category: 'luxury'
  },
  {
    id: '2',
    title: 'Cotton Sarees',
    description: 'Comfortable and elegant cotton sarees perfect for daily wear',
    imageUrl: '/images/cotton-saree.jpg',
    items: '32+ Styles',
    priceRange: '₹899 - ₹4,999',
    badge: 'Everyday Wear',
    gradient: 'from-teal-500 to-blue-500',
    category: 'casual'
  },
  {
    id: '3',
    title: 'Designer Sarees',
    description: 'Exclusive designer pieces for special occasions and weddings',
    imageUrl: '/images/designer-saree.jpg',
    items: '28+ Styles',
    priceRange: '₹3,999 - ₹25,999',
    badge: 'New Arrival',
    gradient: 'from-amber-500 to-orange-500',
    category: 'premium'
  },
  {
    id: '4',
    title: 'Traditional Sarees',
    description: 'Handwoven sarees preserving ancient cultural heritage',
    imageUrl: '/images/traditional-saree.jpg',
    items: '35+ Styles',
    priceRange: '₹1,999 - ₹12,999',
    badge: 'Heritage',
    gradient: 'from-rose-500 to-red-500',
    category: 'traditional'
  },
  {
    id: '5',
    title: 'Georgette Sarees',
    description: 'Lightweight and flowy georgette for modern elegance',
    imageUrl: '/images/georgette-saree.jpg',
    items: '25+ Styles',
    priceRange: '₹1,499 - ₹8,999',
    badge: 'Trending',
    gradient: 'from-indigo-500 to-purple-500',
    category: 'contemporary'
  },
  {
    id: '6',
    title: 'Banarasi Sarees',
    description: 'Authentic Banarasi silk with gold and silver zari work',
    imageUrl: '/images/banarasi-saree.jpg',
    items: '18+ Styles',
    priceRange: '₹4,999 - ₹35,999',
    badge: 'Premium',
    gradient: 'from-emerald-500 to-teal-500',
    category: 'luxury'
  },
  {
    id: '7',
    title: 'Wedding Collection',
    description: 'Grand bridal sarees for your special day',
    imageUrl: '/images/wedding-saree.jpg',
    items: '22+ Styles',
    priceRange: '₹8,999 - ₹49,999',
    badge: 'Bridal',
    gradient: 'from-gold-500 to-yellow-500',
    category: 'wedding'
  },
  {
    id: '8',
    title: 'Party Wear',
    description: 'Stylish sarees for parties and celebrations',
    imageUrl: '/images/party-saree.jpg',
    items: '30+ Styles',
    priceRange: '₹2,999 - ₹14,999',
    badge: 'Festive',
    gradient: 'from-pink-500 to-rose-500',
    category: 'festive'
  },
];

const categories = [
  { name: 'All', count: collections.length },
  { name: 'Luxury', count: collections.filter(c => c.category === 'luxury').length },
  { name: 'Casual', count: collections.filter(c => c.category === 'casual').length },
  { name: 'Wedding', count: collections.filter(c => c.category === 'wedding').length },
  { name: 'Traditional', count: collections.filter(c => c.category === 'traditional').length },
];

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredCollections = activeCategory === 'All' 
    ? collections 
    : collections.filter(collection => collection.category === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50/30">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-300">Exquisite</span> Collections
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
            Discover handpicked sarees that blend tradition with contemporary elegance
          </p>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                    activeCategory === category.name
                      ? 'bg-gradient-to-r from-teal-500 to-amber-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-80">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-semibold">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeCategory === 'All' ? 'All Collections' : activeCategory + ' Collections'}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredCollections.length} stunning collections found
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={collection.imageUrl}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${collection.gradient} text-white text-sm font-bold rounded-full shadow-lg`}>
                      {collection.badge}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
                      ♡
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-lg">
                      👁️
                    </button>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

                  {/* Quick View Button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/collection/${collection.id}`}
                      className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 font-bold rounded-2xl hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg"
                    >
                      Explore Collection
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                      {collection.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {collection.items}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {collection.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Price Range:</span>
                      <span className="font-bold text-teal-600">{collection.priceRange}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/collection/${collection.id}`}
                        className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
                      >
                        <span>View Collection</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                      
                      <button className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${collection.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredCollections.length > 8 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                Load More Collections
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 opacity-95">
            Our personal styling experts can help you find the perfect saree for any occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              Book Style Consultation
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;