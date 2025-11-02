"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Heart, 
  ArrowRight, 
  ShoppingBag, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Truck,
  Clock,
  Quote,
  MapPin
} from 'lucide-react';
import Footer from './components/Footer';

// Video data with different themes
const videos = [
  { src: "/hero1.mp4", title: "Traditional Elegance", subtitle: "Discover our heritage collection" },
  { src: "/hero.mp4", title: "Modern Luxury", subtitle: "Contemporary designs for the modern woman" },
  { src: "/hero3.mp4", title: "Wedding Collection", subtitle: "Perfect for your special day" },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Classic Silk Saree',
    price: '₹2,499',
    originalPrice: '₹3,499',
    imageUrl: '/saree1.jpg',
    category: 'Silk',
    rating: 4.8,
    isNew: true,
    discount: 29,
  },
  {
    id: 2,
    name: 'Elegant Banarasi Saree',
    price: '₹3,999',
    originalPrice: '₹4,999',
    imageUrl: '/saree2.jpg',
    category: 'Banarasi',
    rating: 4.9,
    isNew: false,
    discount: 20,
  },
  {
    id: 3,
    name: 'Traditional Cotton Saree',
    price: '₹1,899',
    originalPrice: '₹2,499',
    imageUrl: '/saree3.jpg',
    category: 'Cotton',
    rating: 4.7,
    isNew: true,
    discount: 24,
  },
  {
    id: 4,
    name: 'Designer Georgette Saree',
    price: '₹2,999',
    originalPrice: '₹3,999',
    imageUrl: '/saree4.jpg',
    category: 'Georgette',
    rating: 4.6,
    isNew: false,
    discount: 25,
  },
];

const categories = [
  { 
    name: 'Silk Sarees', 
    count: '45+', 
    image: '/saree1.jpg', 
    bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500'
  },
  { 
    name: 'Cotton Sarees', 
    count: '32+', 
    image: '/saree2.jpg', 
    bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500'
  },
  { 
    name: 'Designer Sarees', 
    count: '28+', 
    image: '/saree3.jpg', 
    bgColor: 'bg-gradient-to-br from-pink-400 to-rose-500'
  },
  { 
    name: 'Wedding Collection', 
    count: '15+', 
    image: '/saree4.jpg', 
    bgColor: 'bg-gradient-to-br from-purple-400 to-indigo-500'
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    comment: 'The quality and craftsmanship of the sarees are exceptional! The silk feels luxurious and the embroidery is absolutely stunning. Perfect for my sister\'s wedding.',
    rating: 5,
    location: 'Mumbai',
    purchase: 'Banarasi Silk Saree'
  },
  {
    id: 2,
    name: 'Anita Patel',
    comment: 'Beautiful collection and perfect for wedding occasions. The delivery was prompt and packaging was elegant. Will definitely shop again!',
    rating: 5,
    location: 'Delhi',
    purchase: 'Designer Georgette Saree'
  },
  {
    id: 3,
    name: 'Rohini Kumar',
    comment: 'Fast delivery and excellent customer service. The saree exceeded my expectations in quality and design. The color is even more beautiful in person.',
    rating: 4,
    location: 'Bangalore',
    purchase: 'Traditional Cotton Saree'
  },
  {
    id: 4,
    name: 'Meera Desai',
    comment: 'Absolutely in love with my purchase! The attention to detail is remarkable. Received so many compliments at the party. Highly recommended!',
    rating: 5,
    location: 'Chennai',
    purchase: 'Silk Wedding Saree'
  },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders above ₹1999' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure transactions' },
  { icon: Clock, title: '24/7 Support', description: 'Always here to help you' },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true);

  // Hero video auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Testimonial auto-slide functionality
  useEffect(() => {
    if (!isTestimonialAutoPlaying) return;
    
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [isTestimonialAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
  };

  const goToTestimonial = (index) => {
    setTestimonialIndex(index);
  };

  // Group testimonials into pairs for desktop view
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    groupedTestimonials.push(testimonials.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50/30">
      {/* Enhanced Hero Video Slider */}
      <section className="relative h-[85vh] min-h-[700px] rounded-b-3xl overflow-hidden">
        {/* Video Slides */}
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              className="w-full h-full object-cover"
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsLoading(false)}
            />
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-400 w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">🎉 New Collection Launch</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {videos[currentIndex].title}
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-lg leading-relaxed">
                {videos[currentIndex].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-amber-500/25 text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="group px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Discover Story
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-amber-500 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our diverse collection of traditional and contemporary sarees for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className={`group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${category.bgColor}`}
              >
                {/* Fallback background color */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-90"></div>
                
                {/* Try to load image, fallback to color */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={(e) => {
                      // If image fails to load, hide it and rely on background color
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-6 left-6 text-white z-20">
                  <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-gray-200">{category.count} Styles</p>
                </div>
                
                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-amber-600 transition-all duration-300 transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-amber-600 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked sarees that define elegance, tradition, and contemporary style
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg">
                        New
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <Link
                      href={`/product/${product.id}`}
                      className="block w-full py-3 bg-white/90 backdrop-blur-sm text-center text-gray-900 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Quick View
                    </Link>
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    {product.discount && (
                      <span className="px-3 py-1 bg-rose-500 text-white text-sm font-bold rounded-full shadow-lg">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <StarRating rating={product.rating} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-amber-600 text-white font-bold rounded-2xl hover:from-teal-700 hover:to-amber-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Slider */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Customer Love</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have experienced the elegance and quality of our collections
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setIsTestimonialAutoPlaying(false)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-2xl border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-200 hover:shadow-xl transition-all duration-300 z-20 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setIsTestimonialAutoPlaying(false)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-2xl border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-200 hover:shadow-xl transition-all duration-300 z-20 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Slider Content */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {groupedTestimonials.map((group, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {group.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                        >
                          {/* Background Pattern */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-amber-50 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                          
                          {/* Quote Icon */}
                          <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                            <Quote className="w-5 h-5 text-white" />
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-2 mb-6">
                            <StarRating rating={testimonial.rating} />
                            <span className="text-sm text-gray-500 font-medium">
                              {testimonial.rating}.0/5.0
                            </span>
                          </div>

                          {/* Comment */}
                          <p className="text-gray-700 text-lg mb-6 leading-relaxed relative z-10 line-clamp-4">
                            "{testimonial.comment}"
                          </p>

                          {/* Purchase Info */}
                          <div className="mb-6">
                            <span className="text-sm text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full">
                              Purchased: {testimonial.purchase}
                            </span>
                          </div>

                          {/* Customer Info */}
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{testimonial.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Border */}
                          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-200 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3 mt-12">
              {groupedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  onMouseEnter={() => setIsTestimonialAutoPlaying(false)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonialIndex 
                      ? 'bg-gradient-to-r from-teal-500 to-amber-500 w-8 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-amber-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get exclusive offers, early access to new collections, and style tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-300"
              />
              <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              No spam ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
     <div className='mt-10'>

      <Footer/>
     </div>

     
    </div>
  );
}