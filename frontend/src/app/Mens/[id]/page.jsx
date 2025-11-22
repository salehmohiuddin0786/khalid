"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  Clock,
  ArrowLeft,
  Plus,
  Minus,
  Crown,
  Zap,
  Check,
  Sparkles
} from "lucide-react";
import Footer from "@/app/components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  const addToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('womenCart') || '{}');
    
    // Add or update product in cart
    if (existingCart[id]) {
      existingCart[id].quantity += quantity;
    } else {
      existingCart[id] = {
        product: product,
        quantity: quantity
      };
    }
    
    // Save back to localStorage
    localStorage.setItem('womenCart', JSON.stringify(existingCart));
    
    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-rose-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading product...</div>
        </div>
      </div>
    );
  }

  const imageUrl = fixImageURL(product.image);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
      {/* Header Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push('/WomensWear')}
            className="flex items-center gap-2 text-gray-700 hover:text-rose-600 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Collection
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-50 to-pink-50">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
              
              {/* Favorite Button */}
              <button
                onClick={toggleFavorite}
                className={`absolute top-6 right-6 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                  isFavorite
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                    : "bg-white/90 text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                <Heart 
                  className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} 
                />
              </button>

              {/* Price Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white/95 backdrop-blur-sm text-rose-600 px-6 py-3 rounded-2xl text-2xl font-bold shadow-lg">
                  ₹{product.price}
                </div>
              </div>

              {/* Rating Badge */}
              {product.rating && (
                <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-lg font-semibold backdrop-blur-sm flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  {product.rating}
                </div>
              )}

              {/* New Arrival Badge */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  New Arrival
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                <Truck className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800">Free Shipping</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                <Shield className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800">Secure Payment</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                <Clock className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800">24/7 Support</div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-3 rounded-full text-sm font-semibold">
              <Crown className="w-5 h-5" />
              {product.subcategory?.name || "Women's Fashion"}
            </div>

            {/* Product Title */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description || "Elegant women's fashion piece designed for comfort and style. Crafted with premium materials and attention to detail for the modern woman."}
            </p>

            {/* Stock Information */}
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <Zap className="w-6 h-6 text-green-500" />
              <span className="font-semibold">{product.quantity || 10} items in stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-800">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-16 text-center text-xl font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-lg text-gray-600">
                  Total: <span className="font-bold text-rose-600">₹{product.price * quantity}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={addedToCart}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${
                addedToCart
                  ? "bg-green-500 hover:bg-green-600 shadow-green-500/25"
                  : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-rose-500/25"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-6 h-6" />
                  Add to Cart - ₹{product.price * quantity}
                </>
              )}
            </button>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium quality fabrics</li>
                <li>• Perfect fit guarantee</li>
                <li>• Easy returns within 30 days</li>
                <li>• Free shipping on orders over ₹999</li>
                <li>• Handcrafted with attention to detail</li>
              </ul>
            </div>

            {/* Care Instructions */}
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
              <h3 className="text-lg font-semibold text-rose-800 mb-3">Care Instructions</h3>
              <ul className="space-y-2 text-rose-700 text-sm">
                <li>• Machine wash cold with similar colors</li>
                <li>• Tumble dry low</li>
                <li>• Iron on low heat if needed</li>
                <li>• Do not bleach</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Complete Your Look
          </h2>
          <div className="text-center">
            <button
              onClick={() => router.push('/Mens')}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <ShoppingBag className="w-6 h-6" />
              Explore More Products
            </button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}