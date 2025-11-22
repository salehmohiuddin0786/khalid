"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  Sparkles, 
  Filter, 
  Star, 
  Heart, 
  Zap, 
  Crown, 
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Clock,
  Shield,
  Truck,
  Plus,
  Minus,
  Check
} from "lucide-react";
import Footer from "../components/Footer";

const WomensWear = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState({});

  const API_URL = "http://localhost:4000/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);

        const updatedData = res.data.map((item) => {
          if (!item.image.startsWith("http")) {
            const imgPart = item.image.split("uploads/")[1];
            item.image = `http://localhost:4000/uploads/${imgPart}`;
          }
          return item;
        });

        setProducts(
          updatedData.filter((p) => p.category?.name === "Women")
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    // Load cart from localStorage
    const savedCart = localStorage.getItem('womenCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    fetchProducts();
  }, []);

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

  const addToCart = (product) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[product.id]) {
        newCart[product.id] = {
          ...newCart[product.id],
          quantity: newCart[product.id].quantity + 1
        };
      } else {
        newCart[product.id] = {
          product,
          quantity: 1
        };
      }
      
      // Save to localStorage
      localStorage.setItem('womenCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId]) {
        if (newCart[productId].quantity > 1) {
          newCart[productId] = {
            ...newCart[productId],
            quantity: newCart[productId].quantity - 1
          };
        } else {
          delete newCart[productId];
        }
      }
      
      // Save to localStorage
      localStorage.setItem('womenCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getCartQuantity = (productId) => {
    return cart[productId]?.quantity || 0;
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const viewProductDetails = (productId) => {
    router.push(`/Women/${productId}`);
  };

  const sortedProducts = [...products].sort((a, b) => {
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

  const LoadingSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-72 bg-gradient-to-br from-rose-50 to-pink-50 animate-pulse"></div>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold">New Collection 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
            Women's Fashion
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover exquisite dresses and outfits that celebrate your unique beauty and style
          </p>

          {/* Cart Indicator */}
          <div className="absolute top-6 right-6">
            <div className="relative">
              <button className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/30 transition-colors duration-300">
                <ShoppingBag className="w-6 h-6" />
              </button>
              {getTotalCartItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <Crown className="w-8 h-8" />
                {products.length}+
              </div>
              <div className="text-white/80 text-sm mt-2">Premium Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <Zap className="w-8 h-8" />
                100%
              </div>
              <div className="text-white/80 text-sm mt-2">Quality Assured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <Star className="w-8 h-8" />
                4.8
              </div>
              <div className="text-white/80 text-sm mt-2">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Sorting & Features */}
      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-lg border-b shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Features */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Truck className="w-5 h-5 text-rose-600" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Shield className="w-5 h-5 text-rose-600" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-5 h-5 text-rose-600" />
                24/7 Support
              </div>
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
              <TrendingUp className="w-8 h-8 text-rose-600" />
              Curated Collection
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({sortedProducts.length} products)
              </span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => {
              const cartQuantity = getCartQuantity(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  {/* Enhanced Image Container */}
                  <div className="relative h-72 w-full bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden">
                    <Image
                      src={product.image || "/no-image.png"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                        favorites.has(product.id)
                          ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                          : "bg-white/90 text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.has(product.id) ? "fill-current" : ""}`} 
                      />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 backdrop-blur-sm text-rose-600 px-4 py-2 rounded-2xl text-lg font-bold shadow-lg">
                        ₹{product.price}
                      </div>
                    </div>

                    {/* Rating Badge */}
                    {product.rating && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {product.rating}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Info Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description || "Elegant women's fashion piece designed for comfort and style."}
                    </p>

                    {/* Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                        {product.subcategory?.name || "Fashion"}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{product.quantity || 10} in stock</span>
                      </div>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className="space-y-3">
                      {/* View Details Button */}
                      <button
                        onClick={() => viewProductDetails(product.id)}
                        className="w-full py-3 text-center bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-2xl font-bold hover:from-rose-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/25 flex items-center justify-center gap-2 group/btn"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>

                      {/* Add to Cart Section */}
                      {cartQuantity > 0 ? (
                        <div className="flex items-center justify-between bg-rose-50 rounded-2xl p-3 border border-rose-100">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-rose-700 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            {cartQuantity} in cart
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">👗</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                We're updating our women's collection. Please check back soon for new arrivals!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            Ready to Shine?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of stylish women who trust us for their fashion needs
          </p>
          <button className="px-10 py-4 bg-white text-rose-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto">
            <ShoppingBag className="w-6 h-6" />
            Start Shopping Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default WomensWear;