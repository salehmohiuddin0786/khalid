"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:4000/api/products?category=Women"
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories
  const uniqueCategories = [
    "All",
    ...new Set(
      products.map((item) =>
        item.subcategory?.name
          ? item.subcategory.name.charAt(0).toUpperCase() +
            item.subcategory.name.slice(1)
          : "Other"
      )
    ),
  ];

  // Group products by category for section display
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.subcategory?.name 
      ? product.subcategory.name.charAt(0).toUpperCase() + product.subcategory.name.slice(1)
      : "Other";
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Filter and sort logic
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (item) =>
            item.subcategory?.name?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  // Sort products within each category
  Object.keys(productsByCategory).forEach(category => {
    productsByCategory[category] = productsByCategory[category].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  });

  // Category descriptions for better UX
  const categoryDescriptions = {
    "Silk": "Luxurious silk sarees that embody elegance and tradition, perfect for weddings and special occasions.",
    "Cotton": "Comfortable and breathable cotton sarees ideal for daily wear and casual gatherings.",
    "Banarasi": "Exquisite Banarasi silk sarees known for their intricate zari work and royal heritage.",
    "Chiffon": "Lightweight and flowy chiffon sarees that offer a modern and graceful drape.",
    "Other": "Unique and special sarees that stand out with their distinctive character and style."
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-teal-50/30">
        <section className="relative py-20 bg-gradient-to-r from-teal-600 to-amber-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="h-16 bg-white/20 animate-pulse rounded-lg mb-6 mx-auto max-w-2xl"></div>
            <div className="h-8 bg-white/20 animate-pulse rounded-lg mx-auto max-w-xl"></div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border shadow overflow-hidden">
                <div className="h-80 bg-gray-200 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-teal-600 via-purple-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold">✨ New Arrivals Every Week</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
             Collection
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
            Where tradition meets contemporary elegance. Discover handpicked sarees that tell a story of craftsmanship and beauty.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold">{products.length}+</div>
              <div className="text-white/80 text-sm">Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{uniqueCategories.length - 1}+</div>
              <div className="text-white/80 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-white/80 text-sm">Authentic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter + Sorting */}
      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-lg border-b shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-teal-600 to-purple-600 text-white shadow-lg shadow-teal-500/25"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-teal-200 hover:text-teal-700"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Enhanced Sorting */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-4 py-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-0 focus:ring-0 font-medium text-gray-800 cursor-pointer"
              >
                <option value="featured">🔥 Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Display */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* When "All" is selected - Show categorized sections */}
          {activeCategory === "All" ? (
            <div className="space-y-20">
              {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <div key={category} className="category-section">
                  {/* Enhanced Category Header */}
                  <div className="text-center mb-16 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl font-black text-gray-100/50 select-none">
                        {category}
                      </div>
                    </div>
                    <div className="relative">
                      <h2 className="text-5xl font-bold text-gray-800 mb-6">
                        {category} Sarees
                      </h2>
                      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        {categoryDescriptions[category] || `Explore our exquisite collection of ${category.toLowerCase()} sarees, featuring traditional craftsmanship and contemporary designs.`}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Products Grid */}
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryProducts.map((p) => (
                      <div
                        key={p.id}
                        className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
                      >
                        {/* Enhanced Image Container */}
                        <div className="relative h-80 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-110 duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm text-rose-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                              ₹{p.price}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                            {p.name}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>

                          <Link
                            href={`/product/${p.id}`}
                            className="w-full py-3 text-center bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-2xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2"
                          >
                            Explore Design
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Empty State */}
                  {categoryProducts.length === 0 && (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">😔</div>
                      <p className="text-gray-500 text-lg">
                        No {category.toLowerCase()} sarees available at the moment.
                      </p>
                      <p className="text-gray-400 mt-2">
                        Check back soon for new arrivals!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* When specific category is selected - Show single grid */
            <div>
              {/* Enhanced Selected Category Header */}
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl font-black text-gray-100/50 select-none">
                    {activeCategory}
                  </div>
                </div>
                <div className="relative">
                  <h2 className="text-5xl font-bold text-gray-800 mb-6">
                    {activeCategory} Sarees
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    {categoryDescriptions[activeCategory] || `Discover our curated selection of ${activeCategory.toLowerCase()} sarees, perfect for every occasion.`}
                  </p>
                  <div className="mt-4 text-teal-600 font-semibold">
                    {sortedProducts.length} designs available
                  </div>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
                  >
                    {/* Enhanced Image Container */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm text-rose-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          ₹{p.price}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      <Link
                        href={`/product/${p.id}`}
                        className="w-full py-3 text-center bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-2xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2"
                      >
                        Explore Design
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">
                    No {activeCategory.toLowerCase()} sarees found
                  </h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">
                    We're constantly updating our collection. Please check back later or explore other categories.
                  </p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-6 px-8 py-3 bg-teal-600 text-white rounded-2xl font-semibold hover:bg-teal-700 transition-colors duration-300"
                  >
                    Browse All Categories
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Our style experts are here to help you find the perfect saree for any occasion.
          </p>
          <button className="px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl">
            💬 Chat with Style Expert
          </button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Collection;