"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle, 
  Lock,
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  FileText
} from "lucide-react";

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveCard: false
  });

  // Load cart items
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const mensCart = JSON.parse(localStorage.getItem('cart') || '{}');
        const womensCart = JSON.parse(localStorage.getItem('womenCart') || '{}');
        const kidsCart = JSON.parse(localStorage.getItem('kidsCart') || '{}');

        const allItems = [
          ...Object.values(mensCart),
          ...Object.values(womensCart),
          ...Object.values(kidsCart)
        ].filter(item => item && item.product && item.quantity > 0);

        setCartItems(allItems);
      } catch (error) {
        console.error("Error loading cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + ((item?.product?.price || 0) * (item?.quantity || 0)), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Generate random order number
    const newOrderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderNumber(newOrderNumber);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      
      // Clear cart after successful order
      localStorage.removeItem('cart');
      localStorage.removeItem('womenCart');
      localStorage.removeItem('kidsCart');
    }, 2000);
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading checkout...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 text-lg mb-8">Add some items to proceed with checkout</p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-200">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="text-sm text-gray-600 mb-2">Order Number</div>
              <div className="text-2xl font-bold text-gray-800 font-mono">{orderNumber}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                <div className="text-sm text-gray-600">
                  <div>Items: {totalItems}</div>
                  <div>Total: ₹{total.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
                <div className="text-sm text-gray-600">
                  <div>{shippingInfo.fullName}</div>
                  <div>{shippingInfo.address}</div>
                  <div>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/orders')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-bold hover:border-gray-400 transition-all"
              >
                View Orders
              </button>
            </div>
          </div>
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
              Back to Cart
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
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className={`flex items-center ${activeStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold ${
                activeStep >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-3 font-semibold">Shipping</span>
            </div>
            
            <div className={`w-24 h-1 mx-4 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            {/* Step 2 */}
            <div className={`flex items-center ${activeStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold ${
                activeStep >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-3 font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {activeStep === 1 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingInfo.pincode}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange(setShippingInfo)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange(setShippingInfo)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {activeStep === 2 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <div className="text-sm text-blue-700">
                        <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handleInputChange(setPaymentInfo)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handleInputChange(setPaymentInfo)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange(setPaymentInfo)}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={handleInputChange(setPaymentInfo)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={paymentInfo.saveCard}
                      onChange={handleInputChange(setPaymentInfo)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700">
                      Save card for future payments
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3"
                  >
                    <Lock className="w-6 h-6" />
                    Pay ₹{total.toFixed(2)}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">
                        {item.product.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.product.price}
                      </div>
                    </div>
                    <div className="font-bold text-gray-800">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Secure Checkout</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold text-gray-800">SSL Secured</div>
                    <div className="text-sm text-gray-600">256-bit encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="font-semibold text-gray-800">Fast Delivery</div>
                    <div className="text-sm text-gray-600">2-3 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-500" />
                  <div>
                    <div className="font-semibold text-gray-800">Easy Returns</div>
                    <div className="text-sm text-gray-600">30-day policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;