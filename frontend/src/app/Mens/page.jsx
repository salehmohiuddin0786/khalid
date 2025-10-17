"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const mensWear = [
  {
    id: '1',
    name: 'Classic Cotton Kurta',
    price: '₹1,200',
    originalPrice: '₹1,800',
    discount: '33% off',
    imageUrl: '/images/mens-kurta1.jpg',
    category: 'Traditional',
    rating: 4.5,
    reviews: 156,
    tags: ['Bestseller', 'Cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Beige']
  },
  {
    id: '2',
    name: 'Designer Sherwani',
    price: '₹5,500',
    originalPrice: '₹7,999',
    discount: '31% off',
    imageUrl: '/images/mens-sherwani1.jpg',
    category: 'Wedding',
    rating: 4.8,
    reviews: 89,
    tags: ['Premium', 'Embroidered'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Maroon', 'Navy', 'Black']
  },
  {
    id: '3',
    name: 'Premium Linen Shirt',
    price: '₹999',
    originalPrice: '₹1,499',
    discount: '33% off',
    imageUrl: '/images/mens-shirt1.jpg',
    category: 'Casual',
    rating: 4.3,
    reviews: 234,
    tags: ['Linen', 'Summer'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Pink', 'Green']
  },
  {
    id: '4',
    name: 'Slim Fit Blazer',
    price: '₹4,000',
    originalPrice: '₹5,999',
    discount: '33% off',
    imageUrl: '/images/mens-blazer1.jpg',
    category: 'Formal',
    rating: 4.6,
    reviews: 167,
    tags: ['Office Wear', 'Slim Fit'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Gray']
  },
  {
    id: '5',
    name: 'Pathani Suit Set',
    price: '₹2,200',
    originalPrice: '₹3,299',
    discount: '33% off',
    imageUrl: '/images/mens-pathani1.jpg',
    category: 'Traditional',
    rating: 4.4,
    reviews: 98,
    tags: ['Comfort', 'Elegant'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue']
  },
  {
    id: '6',
    name: 'Denim Jacket',
    price: '₹1,800',
    originalPrice: '₹2,700',
    discount: '33% off',
    imageUrl: '/images/mens-jacket1.jpg',
    category: 'Casual',
    rating: 4.2,
    reviews: 145,
    tags: ['Trending', 'Denim'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black']
  },
  {
    id: '7',
    name: 'Silk Wedding Kurta',
    price: '₹3,500',
    originalPrice: '₹5,200',
    discount: '33% off',
    imageUrl: '/images/mens-silk-kurta1.jpg',
    category: 'Wedding',
    rating: 4.7,
    reviews: 76,
    tags: ['Silk', 'Luxury'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Cream', 'Gold', 'Maroon']
  },
  {
    id: '8',
    name: 'Office Formal Suit',
    price: '₹6,500',
    originalPrice: '₹9,999',
    discount: '35% off',
    imageUrl: '/images/mens-suit1.jpg',
    category: 'Formal',
    rating: 4.5,
    reviews: 112,
    tags: ['Professional', '3-Piece'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Charcoal']
  },
];

const MensWear = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = ['All', 'Traditional', 'Wedding', 'Casual', 'Formal'];
  
  const filteredProducts = mensWear.filter(item => 
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Men's Fashion Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium menswear that combines style with comfort. 
            From traditional elegance to modern sophistication - find your perfect look.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium"
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
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              onMouseEnter={() => setHoveredProduct(item.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {item.discount}
                  </span>
                </div>

                {/* Tags */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-95 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Action Buttons */}
                <div className={`absolute bottom-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredProduct === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <button className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                  <button className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                  <StarRating rating={item.rating} />
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {item.name}
                </h3>

                {/* Size Preview */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">Sizes:</span>
                  <div className="flex gap-1">
                    {item.sizes.slice(0, 3).map((size) => (
                      <span key={size} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {size}
                      </span>
                    ))}
                    {item.sizes.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{item.sizes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                  <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  <a
                    href={`/product/${item.id}`}
                    className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3.5 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
            Load More Styles
          </button>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Premium Quality</h3>
            <p className="text-gray-600">Crafted with finest fabrics and attention to detail</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg border border-teal-100 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Perfect Fit Guarantee</h3>
            <p className="text-gray-600">Free alterations and size exchanges available</p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-all duration-300">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-200 transition-colors duration-300">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Secure Shopping</h3>
            <p className="text-gray-600">Your data is protected with 256-bit encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensWear;