"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Shirt, 
  Filter, 
  Star, 
  Heart, 
  Crown, 
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Truck,
  Shield,
  Clock,
  Sparkles,
  BadgeCheck,
  Zap
} from "lucide-react";

const MensWear = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const categories = ["All", "shirts", "pants", "jeans", "tshirts"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/products");
        const data = await res.json();

        const mensProducts = data.filter(
          (item) =>
            item.category?.name?.toLowerCase() === "mens" ||
            item.category?.name?.toLowerCase() === "men"
        );

        setProducts(mensProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (item) =>
      selectedCategory === "All" ||
      item.subcategory?.name?.toLowerCase() === selectedCategory.toLowerCase()
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const getImageUrl = (img) =>
    img?.startsWith("http")
      ? img
      : `http://localhost:4000/uploads/${img}`;

  const LoadingSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-72 bg-gradient-to-br from-blue-50 to-cyan-50 animate-pulse"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold">New Arrivals 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Men's Collection
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed mb-8">
            Premium men's fashion that combines style, comfort, and sophistication
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <Crown className="w-8 h-8" />
                {products.length}+
              </div>
              <div className="text-white/80 text-sm mt-2">Premium Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <BadgeCheck className="w-8 h-8" />
                100%
              </div>
              <div className="text-white/80 text-sm mt-2">Quality Assured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <Zap className="w-8 h-8" />
                Fast
              </div>
              <div className="text-white/80 text-sm mt-2">Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters & Features */}
      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-lg border-b shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Features */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Truck className="w-5 h-5 text-blue-600" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Shield className="w-5 h-5 text-blue-600" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-5 h-5 text-blue-600" />
                24/7 Support
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Enhanced Sorting */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-3 border border-gray-200">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-0 focus:ring-0 font-medium text-gray-800 cursor-pointer"
              >
                <option value="featured">⭐ Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">🏆 Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              {selectedCategory === "All" ? "Complete Collection" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`}
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({sortedProducts.length} products)
              </span>
            </h2>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {sortedProducts.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  {/* Enhanced Image Container */}
                  <div className="relative h-72 w-full bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                        favorites.has(item.id)
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/90 text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.has(item.id) ? "fill-current" : ""}`} 
                      />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-2xl text-lg font-bold shadow-lg">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Rating Badge */}
                    {item.rating && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {item.rating}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Info Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                        {item.subcategory?.name || "Mens Wear"}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{item.quantity || 10} in stock</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description || "Premium men's fashion designed for style and comfort."}
                    </p>

                    {/* Enhanced CTA Button */}
                    <a
                      href={`/product/${item.id}`}
                      className="w-full py-4 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-20">
              <div className="text-8xl mb-6">👔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                We couldn't find any products in this category. Try selecting a different category.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <Shirt className="w-5 h-5" />
                Browse All Categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Crown className="w-8 h-8" />
            Elevate Your Style
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of stylish men who trust us for their fashion needs
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto">
            <ShoppingBag className="w-6 h-6" />
            Start Shopping Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MensWear;