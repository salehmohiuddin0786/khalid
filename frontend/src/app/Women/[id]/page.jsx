"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Convert local disk path → backend hosted image URL
  const fixImageURL = (img) => {
    if (!img) return "/no-image.png";
    if (img.startsWith("http")) return img;
    return `http://localhost:4000/uploads/${img.split("uploads/")[1]}`;
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Loading product...
      </div>
    );
  }

  const imageUrl = fixImageURL(product.image);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <span className="text-3xl font-bold text-rose-600">
            ₹{product.price}
          </span>

          <button className="mt-6 block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg">
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
