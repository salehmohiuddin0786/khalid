"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CreditCard,
  Truck,
  Shield,
  Zap
} from "lucide-react";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Combine all carts from different categories with validation
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const mensCart = JSON.parse(localStorage.getItem('cart') || '{}');
        const womensCart = JSON.parse(localStorage.getItem('womenCart') || '{}');
        const kidsCart = JSON.parse(localStorage.getItem('kidsCart') || '{}');

        // Combine all cart items with validation
        const allItems = [
          ...Object.values(mensCart),
          ...Object.values(womensCart),
          ...Object.values(kidsCart)
        ].filter(item => {
          // Validate that item has required properties
          return item && 
                 item.product && 
                 typeof item.product === 'object' &&
                 item.product.id &&
                 item.product.name &&
                 typeof item.product.price === 'number' &&
                 typeof item.quantity === 'number' &&
                 item.quantity > 0;
        });

        console.log('Loaded cart items:', allItems); // Debug log
        setCartItems(allItems);
      } catch (error) {
        console.error("Error loading cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();

    // Listen for storage changes to update cart in real-time
    const handleStorageChange = () => {
      loadCartItems();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also set up a custom event listener for cart updates within the same window
    const handleCartUpdate = () => {
      loadCartItems();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateQuantity = (productId, newQuantity, category) => {
    if (newQuantity < 1) {
      removeItem(productId, category);
      return;
    }

    let cartKey = 'cart';
    if (category === 'Women') cartKey = 'womenCart';
    if (category === 'Kids') cartKey = 'kidsCart';

    try {
      const cart = JSON.parse(localStorage.getItem(cartKey) || '{}');
      
      if (cart[productId]) {
        cart[productId].quantity = newQuantity;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        
        // Update local state
        setCartItems(prev => 
          prev.map(item => 
            item.product.id === productId 
              ? { ...item, quantity: newQuantity }
              : item
          ).filter(item => item.quantity > 0)
        );

        // Trigger storage event for other tabs
        window.dispatchEvent(new Event('storage'));
        // Trigger custom event for same window
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = (productId, category) => {
    let cartKey = 'cart';
    if (category === 'Women') cartKey = 'womenCart';
    if (category === 'Kids') cartKey = 'kidsCart';

    try {
      const cart = JSON.parse(localStorage.getItem(cartKey) || '{}');
      delete cart[productId];
      localStorage.setItem(cartKey, JSON.stringify(cart));
      
      // Update local state
      setCartItems(prev => prev.filter(item => item.product.id !== productId));

      // Trigger events
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = () => {
    try {
      localStorage.removeItem('cart');
      localStorage.removeItem('womenCart');
      localStorage.removeItem('kidsCart');
      setCartItems([]);
      
      // Trigger events
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCategoryColor = (category) => {
    if (!category) return 'border-blue-200 bg-blue-50 text-blue-700';
    
    switch(category.toLowerCase()) {
      case 'women':
        return 'border-rose-200 bg-rose-50 text-rose-700';
      case 'kids':
        return 'border-pink-200 bg-pink-50 text-pink-700';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-700';
    }
  };

  const getCategoryName = (category) => {
    if (!category) return "Men's";
    
    switch(category.toLowerCase()) {
      case 'women':
        return "Women's";
      case 'kids':
        return "Kids";
      default:
        return "Men's";
    }
  };

  const getProductImage = (product) => {
    if (!product || !product.image) return null;
    
    if (product.image.startsWith('http')) {
      return product.image;
    }
    
    try {
      const uploadsIndex = product.image.indexOf('uploads/');
      if (uploadsIndex !== -1) {
        const filename = product.image.substring(uploadsIndex + 'uploads/'.length);
        return `http://localhost:4000/uploads/${filename}`;
      }
      return `http://localhost:4000/uploads/${product.image}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return null;
    }
  };

  // Calculate totals with safe defaults
  const subtotal = cartItems.reduce((total, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 0;
    return total + (price * quantity);
  }, 0);

  const shipping = subtotal > 999 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading your cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white/95 backdrop-blur-lg border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
                <div className="text-sm text-gray-600">Items</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">₹{total.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <ShoppingBag className="w-12 h-12 text-blue-600" />
            Your Shopping Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selected items and proceed to checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <ShoppingBag className="w-6 h-6" />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Cart Items ({totalItems})</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => {
                    const product = item?.product || {};
                    const category = product?.category?.name || product?.category;
                    const imageUrl = getProductImage(product);
                    const price = product?.price || 0;
                    const quantity = item?.quantity || 0;

                    return (
                      <div key={`${product.id}-${index}`} className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={product.name || 'Product'}
                                fill
                                className="object-cover"
                                unoptimized
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ShoppingBag className="w-8 h-8" />
                              </div>
                            )}
                            
                            {/* Category Badge */}
                            <div className={`absolute -top-2 -left-2 px-3 py-1 rounded-full text-xs font-semibold border-2 ${getCategoryColor(category)}`}>
                              {getCategoryName(category)}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                  {product.name || 'Unnamed Product'}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                  {product.description || "Premium quality product"}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-800 mb-1">
                                  ₹{price}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ₹{price} × {quantity}
                                </div>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center bg-gray-100 rounded-2xl">
                                  <button
                                    onClick={() => updateQuantity(product.id, quantity - 1, category)}
                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-12 text-center font-semibold text-gray-800">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(product.id, quantity + 1, category)}
                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-800">
                                    ₹{(price * quantity).toFixed(2)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeItem(product.id, category)}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 999 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                      <p className="text-sm text-blue-700">
                        Add ₹{(999 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>!
                      </p>
                    </div>
                  )}
                </div>

               <button
  onClick={() => router.push("/Checkout")}
  className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3"
>
  <CreditCard className="w-6 h-6" />
  Proceed to Checkout
</button>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Why Shop With Us?</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-semibold text-gray-800">Free Shipping</div>
                      <div className="text-sm text-gray-600">On orders over ₹999</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="font-semibold text-gray-800">Secure Payment</div>
                      <div className="text-sm text-gray-600">100% protected</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-gray-800">Fast Delivery</div>
                      <div className="text-sm text-gray-600">2-3 business days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;