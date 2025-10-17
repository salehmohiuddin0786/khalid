import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    name: 'Classic Silk Saree',
    price: '₹2,499',
    originalPrice: '₹3,499',
    imageUrl: '/images/saree1.jpg',
    category: 'Silk',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: 'Elegant Banarasi Saree',
    price: '₹3,999',
    originalPrice: '₹4,999',
    imageUrl: '/images/saree2.jpg',
    category: 'Banarasi',
    rating: 4.9,
    isNew: false,
  },
  {
    id: 3,
    name: 'Traditional Cotton Saree',
    price: '₹1,899',
    originalPrice: '₹2,499',
    imageUrl: '/images/saree3.jpg',
    category: 'Cotton',
    rating: 4.7,
    isNew: true,
  },
  {
    id: 4,
    name: 'Designer Georgette Saree',
    price: '₹2,999',
    originalPrice: '₹3,999',
    imageUrl: '/images/saree4.jpg',
    category: 'Georgette',
    rating: 4.6,
    isNew: false,
  },
];

const categories = [
  { name: 'Silk Sarees', count: '45+', image: '/images/silk-category.jpg' },
  { name: 'Cotton Sarees', count: '32+', image: '/images/cotton-category.jpg' },
  { name: 'Designer Sarees', count: '28+', image: '/images/designer-category.jpg' },
  { name: 'Wedding Collection', count: '15+', image: '/images/wedding-category.jpg' },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    comment: 'The quality and craftsmanship of the sarees are exceptional!',
    rating: 5,
    location: 'Mumbai',
  },
  {
    id: 2,
    name: 'Anita Patel',
    comment: 'Beautiful collection and perfect for wedding occasions.',
    rating: 5,
    location: 'Delhi',
  },
  {
    id: 3,
    name: 'Rohini Kumar',
    comment: 'Fast delivery and excellent customer service. Highly recommended!',
    rating: 4,
    location: 'Bangalore',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50/30">
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] rounded-b-3xl overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="Saree Fashion Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <span className="text-sm font-semibold">🎉 New Collection Launch</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover <span className="text-amber-300">Timeless</span> Elegance
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-lg">
                Handcrafted sarees that celebrate tradition with contemporary elegance. 
                Perfect for every special occasion in your life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-amber-500/25 text-center"
                >
                  <span className="relative z-10">Shop Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/about"
                  className="group px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our diverse collection of traditional and contemporary sarees
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-gray-200">{category.count} Styles</p>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-white to-teal-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-gray-600 text-lg">Handpicked sarees that define elegance and tradition</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full">
                        New
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
                      ♡
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/product/${product.id}`}
                      className="block w-full py-3 bg-white/90 backdrop-blur-sm text-center text-gray-900 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-teal-600 font-semibold">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      Save ₹{parseInt(product.originalPrice.replace('₹', '')) - parseInt(product.price.replace('₹', ''))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>View All Products</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-amber-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get exclusive offers and early access to new collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50"
              />
              <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;