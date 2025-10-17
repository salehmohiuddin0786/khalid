"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const kidsWear = [
  {
    id: '1',
    name: 'Kids Traditional Saree',
    price: '₹999',
    originalPrice: '₹1,499',
    discount: '33% off',
    imageUrl: '/images/kids-saree1.jpg',
    category: 'Traditional',
    rating: 4.5,
    reviews: 128,
    tags: ['Bestseller', 'New Arrival'],
  },
  {
    id: '2',
    name: 'Kids Floral Dress',
    price: '₹799',
    originalPrice: '₹1,199',
    discount: '25% off',
    imageUrl: '/images/kids-dress1.jpg',
    category: 'Casual',
    rating: 4.2,
    reviews: 89,
    tags: ['Popular'],
  },
  {
    id: '3',
    name: 'Kids Party Wear',
    price: '₹1,199',
    originalPrice: '₹1,799',
    discount: '30% off',
    imageUrl: '/images/kids-party1.jpg',
    category: 'Party',
    rating: 4.8,
    reviews: 156,
    tags: ['Premium', 'Bestseller'],
  },
  {
    id: '4',
    name: 'Kids Casual Wear',
    price: '₹699',
    originalPrice: '₹999',
    discount: '30% off',
    imageUrl: '/images/kids-casual1.jpg',
    category: 'Casual',
    rating: 4.3,
    reviews: 67,
    tags: ['Trending'],
  },
  {
    id: '5',
    name: 'Kids Lehenga Set',
    price: '₹1,499',
    originalPrice: '₹2,199',
    discount: '32% off',
    imageUrl: '/images/kids-lehenga1.jpg',
    category: 'Traditional',
    rating: 4.7,
    reviews: 203,
    tags: ['Festive', 'Bestseller'],
  },
  {
    id: '6',
    name: 'Kids Summer Dress',
    price: '₹599',
    originalPrice: '₹899',
    discount: '33% off',
    imageUrl: '/images/kids-summer1.jpg',
    category: 'Casual',
    rating: 4.4,
    reviews: 94,
    tags: ['Summer Special'],
  },
  {
    id: '7',
    name: 'Kids Designer Gown',
    price: '₹1,299',
    originalPrice: '₹1,999',
    discount: '35% off',
    imageUrl: '/images/kids-gown1.jpg',
    category: 'Party',
    rating: 4.6,
    reviews: 112,
    tags: ['Designer'],
  },
  {
    id: '8',
    name: 'Kids Ethnic Set',
    price: '₹899',
    originalPrice: '₹1,299',
    discount: '31% off',
    imageUrl: '/images/kids-ethnic1.jpg',
    category: 'Traditional',
    rating: 4.1,
    reviews: 78,
    tags: ['Festive'],
  },
];

const KidsWear = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Traditional', 'Casual', 'Party'];
  
  const filteredProducts = kidsWear.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Kids Wear Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover adorable and comfortable outfits for your little ones. 
            Perfect for every occasion - from casual playdates to special celebrations!
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />
                
                {/* Discount Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.discount}
                  </span>
                </div>

                {/* Tags */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-90 text-pink-600 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Action Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-pink-600 p-2 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <StarRating rating={item.rating} />
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                  <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  <a
                    href={`/product/${item.id}`}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
            Load More Products
          </button>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders above ₹1999</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsWear;