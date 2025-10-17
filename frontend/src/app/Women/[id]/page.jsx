"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Example dataset (you can also import this from a separate file)
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
    description:
      "An elegant silk saree with premium zari border, perfect for festive occasions.",
    colors: ["Red", "Blue", "Green"],
    sizes: ["S", "M", "L", "XL"],
  },
  // ...add the rest of your sarees here or import them
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = womensWear.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              {product.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {product.originalPrice}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <span className="text-amber-400 text-lg">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Colors:</h3>
            <div className="flex space-x-3">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 shadow"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Sizes:</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size, i) => (
                <span
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-rose-500 hover:text-white cursor-pointer transition"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-rose-600 hover:to-pink-600 shadow-lg">
            Add to Cart 🛒
          </button>

          <div className="mt-8">
            <Link
              href="/Women"
              className="text-rose-600 hover:underline font-medium"
            >
              ← Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
