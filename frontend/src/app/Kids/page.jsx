"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const apiUrl = "http://localhost:4000/api/products";

const normalizeImage = (raw) => {
  if (!raw) return null;

  if (typeof raw === "string" && (raw.startsWith("http://") || raw.startsWith("https://"))) {
    return raw;
  }

  const uploadsIndex = raw.indexOf("uploads/");
  if (uploadsIndex !== -1) {
    const filename = raw.substring(uploadsIndex + "uploads/".length).replace(/\\/g, "/");
    return `http://localhost:4000/uploads/${filename}`;
  }

  const maybeFile = raw.split(/[\\/]/).pop();
  if (maybeFile) return `http://localhost:4000/uploads/${maybeFile}`;

  return null;
};

const StarRating = ({ rating = 0 }) => {
  const r = Math.round(rating);
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= r ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600">({rating ?? 0})</span>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center mb-16">
      <div className="h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full w-96 mx-auto mb-6 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
    </div>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-72 bg-gray-200 animate-pulse"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded-2xl animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function KidsWear() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const mapped = data.map((p) => ({
          ...p,
          _imageUrl: normalizeImage(p.image),
          _categoryName: (p.category && p.category.name) || (p.categoryName ?? "") || "",
          _subcategoryName: (p.subcategory && p.subcategory.name) || (p.subcategoryName ?? "") || "",
        }));

        if (mounted) setProducts(mapped);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const categorySet = ["All", ...Array.from(
    new Set(
      products
        .map((p) => p._categoryName || p._subcategoryName || "Uncategorized")
        .filter(Boolean)
    )
  )];

  const filtered = products.filter((p) =>
    selectedCategory === "All"
      ? true
      : (p._categoryName === selectedCategory || p._subcategoryName === selectedCategory)
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const kidsOnly = sorted.filter((p) => {
    const cat = (p._categoryName || "").toLowerCase();
    return cat === "kids" || cat === "kid" || (p._subcategoryName || "").toLowerCase() === "kids";
  });

  const loadMore = () => {
    setVisibleProducts(prev => prev + 8);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold">🎉 Perfect Outfits for Little Ones</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
            Kids Fashion
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover adorable, comfortable, and stylish outfits that make every day special for your little stars!
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">{kidsOnly.length}+</div>
              <div className="text-white/80 text-sm">Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{categorySet.length - 1}+</div>
              <div className="text-white/80 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-white/80 text-sm">Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-8 sticky top-0 bg-white/95 backdrop-blur-lg border-b shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categorySet.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleProducts(8);
                  }}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-pink-200 hover:text-pink-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Enhanced Sorting */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-3 border border-gray-200">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>🔧</span>
                Sort by:
              </span>
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
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory === "All" ? "All Kids Collection" : `${selectedCategory} Collection`}
            </h2>
            <span className="text-gray-600 font-medium">
              Showing {Math.min(visibleProducts, kidsOnly.length)} of {kidsOnly.length} products
            </span>
          </div>

          {/* Products Grid */}
          {kidsOnly.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">👶</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                We couldn't find any kids products in this category. Try selecting a different category.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Browse All Categories
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {kidsOnly.slice(0, visibleProducts).map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                  >
                    {/* Enhanced Image Container */}
                    <div className="relative h-72 w-full bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
                      {item._imageUrl ? (
                        <>
                          <Image
                            src={item._imageUrl}
                            alt={item.name || "product"}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-4xl">👕</span>
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm text-pink-600 px-4 py-2 rounded-2xl text-lg font-bold shadow-lg">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Rating Badge */}
                      {item.rating && (
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                          ⭐ {item.rating}
                        </div>
                      )}
                    </div>

                    {/* Enhanced Info Section */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                          {item._subcategoryName || item._categoryName || "Uncategorized"}
                        </span>
                        <StarRating rating={item.rating || 0} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2 leading-tight">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            {item.quantity ?? 0} in stock
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/product/${item.id}`}
                        className="w-full py-4 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25 flex items-center justify-center gap-2 group/btn"
                      >
                        View Details
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Load More */}
              {visibleProducts < kidsOnly.length && (
                <div className="text-center mt-16">
                  <button
                    onClick={loadMore}
                    className="bg-white border-2 border-pink-500 text-pink-600 px-12 py-4 rounded-2xl font-bold hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/25 flex items-center gap-3 mx-auto"
                  >
                    <span>Load More Products</span>
                    <span className="text-lg">👇</span>
                  </button>
                  <p className="text-gray-500 mt-4">
                    Showing {visibleProducts} of {kidsOnly.length} products
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Need Help Sizing?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our kids fashion experts are here to help you find the perfect fit for your little ones!
          </p>
          <button className="px-10 py-4 bg-white text-pink-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto">
            <span>👗</span>
            Chat with Style Expert
          </button>
        </div>
      </section>
    </div>
  );
}