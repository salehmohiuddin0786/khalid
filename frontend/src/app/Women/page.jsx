"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const womensWear = [
  {
    id: "1",
    name: "Elegant Silk Saree",
    price: "₹3,500",
    originalPrice: "₹4,500",
    imageUrl: "/images/women-saree1.jpg",
    category: "Silk",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestseller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green"],
    discount: "22% off",
  },
  {
    id: "2",
    name: "Designer Georgette Saree",
    price: "₹4,200",
    originalPrice: "₹5,500",
    imageUrl: "/images/women-saree2.jpg",
    category: "Georgette",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isBestseller: true,
    sizes: ["M", "L", "XL"],
    colors: ["Pink", "Purple", "Black"],
    discount: "24% off",
  },
  {
    id: "3",
    name: "Casual Cotton Saree",
    price: "₹1,800",
    originalPrice: "₹2,400",
    imageUrl: "/images/women-saree3.jpg",
    category: "Cotton",
    rating: 4.7,
    reviews: 203,
    isNew: true,
    isBestseller: false,
    sizes: ["S", "M", "L"],
    colors: ["White", "Blue", "Yellow"],
    discount: "25% off",
  },
  {
    id: "4",
    name: "Party Wear Saree",
    price: "₹5,000",
    originalPrice: "₹6,500",
    imageUrl: "/images/women-saree4.jpg",
    category: "Designer",
    rating: 4.6,
    reviews: 67,
    isNew: false,
    isBestseller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold", "Silver", "Maroon"],
    discount: "23% off",
  },
  {
    id: "5",
    name: "Banarasi Silk Saree",
    price: "₹8,500",
    originalPrice: "₹12,000",
    imageUrl: "/images/women-saree5.jpg",
    category: "Banarasi",
    rating: 4.9,
    reviews: 45,
    isNew: true,
    isBestseller: true,
    sizes: ["M", "L"],
    colors: ["Red", "Green"],
    discount: "29% off",
  },
  {
    id: "6",
    name: "Traditional Kanjivaram",
    price: "₹7,200",
    originalPrice: "₹9,000",
    imageUrl: "/images/women-saree6.jpg",
    category: "Kanjivaram",
    rating: 4.8,
    reviews: 78,
    isNew: false,
    isBestseller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Pink"],
    discount: "20% off",
  },
  {
    id: "7",
    name: "Chiffon Evening Saree",
    price: "₹3,800",
    originalPrice: "₹4,800",
    imageUrl: "/images/women-saree7.jpg",
    category: "Chiffon",
    rating: 4.5,
    reviews: 92,
    isNew: true,
    isBestseller: false,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    discount: "21% off",
  },
  {
    id: "8",
    name: "Wedding Collection Saree",
    price: "₹12,500",
    originalPrice: "₹16,000",
    imageUrl: "/images/women-saree8.jpg",
    category: "Bridal",
    rating: 4.9,
    reviews: 34,
    isNew: false,
    isBestseller: true,
    sizes: ["M", "L"],
    colors: ["Red", "Gold"],
    discount: "22% off",
  },
];

const categories = [
  { name: "All", count: womensWear.length },
  { name: "Silk", count: womensWear.filter((i) => i.category === "Silk").length },
  { name: "Cotton", count: womensWear.filter((i) => i.category === "Cotton").length },
  { name: "Designer", count: womensWear.filter((i) => i.category === "Designer").length },
  { name: "Bridal", count: womensWear.filter((i) => i.category === "Bridal").length },
];

const WomensWear = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts =
    activeCategory === "All"
      ? womensWear
      : womensWear.filter((item) => item.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[₹,]/g, "")) - parseInt(b.price.replace(/[₹,]/g, ""));
      case "price-high":
        return parseInt(b.price.replace(/[₹,]/g, "")) - parseInt(a.price.replace(/[₹,]/g, ""));
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Women's <span className="text-rose-200">Fashion</span> Collection
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
            Discover exquisite sarees that celebrate your elegance and style
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-80">({category.count})</span>
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeCategory === "All" ? "All Products" : `${activeCategory} Sarees`}
            </h2>
            <p className="text-gray-600 text-lg">
              {sortedProducts.length} beautiful designs found
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
                        New
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg">
                        Bestseller
                      </span>
                    )}
                    <span className="px-3 py-1 bg-rose-500 text-white text-sm font-bold rounded-full shadow-lg">
                      {product.discount}
                    </span>
                  </div>

                  {/* Quick View */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/Women/${product.id}`}
                      className="px-4 py-2 bg-white/90 rounded-xl text-gray-800 font-semibold hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                    {product.category}
                  </span>

                  <div className="flex items-center space-x-2 my-3">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-500">Sizes:</span>
                    <div className="flex space-x-1">
                      {product.sizes.map((size, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 flex items-center justify-center text-xs font-semibold bg-gray-100 rounded-lg hover:bg-rose-500 hover:text-white cursor-pointer"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/Women/${product.id}`}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl text-center font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                      View Details
                    </Link>
                    <button className="w-12 h-12 bg-gray-100 text-gray-700 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg">
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-bold rounded-2xl transition-all transform hover:-translate-y-1">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 text-2xl mb-6 mx-auto">
              🚚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Free Shipping</h3>
            <p className="text-gray-600">
              Free delivery across India on orders above ₹1999
            </p>
          </div>

          <div className="p-8">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 text-2xl mb-6 mx-auto">
              ↩️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Returns</h3>
            <p className="text-gray-600">
              7-day easy return policy with no questions asked
            </p>
          </div>

          <div className="p-8">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 text-2xl mb-6 mx-auto">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
            <p className="text-gray-600">
              100% quality-checked products with warranty
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomensWear;
