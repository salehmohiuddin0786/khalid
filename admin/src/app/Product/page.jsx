"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import { 
  Plus, 
  Upload, 
  Package, 
  DollarSign, 
  Hash, 
  FileText, 
  FolderOpen,
  Image as ImageIcon,
  Trash2,
  Edit,
  Eye,
  ShoppingCart,
  Search,
  RefreshCw,
  X
} from "lucide-react";

const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  const API_BASE_URL = "http://localhost:4000";

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `${API_BASE_URL}/${imagePath}`;
  };

  // Enhanced validation + submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation checks
    if (!form.name.trim()) return alert("Please enter product name");
    if (!form.description.trim()) return alert("Please enter description");
    if (!form.price || isNaN(parseFloat(form.price))) return alert("Please enter valid price");
    if (!form.quantity || isNaN(parseInt(form.quantity))) return alert("Please enter valid quantity");
    if (!form.category) return alert("Please select a category");
    if (!form.image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("price", parseFloat(form.price));
    formData.append("quantity", parseInt(form.quantity, 10));
    formData.append("categoryId", form.category);
    formData.append("image", form.image);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to upload product: ${errorData.message || res.statusText}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      alert("✅ Product added successfully!");
      resetForm();
      fetchProducts();
      setActiveTab("products");
    } catch (err) {
      alert("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      image: null,
    });
    setImagePreview(null);
  };

  const isSubmitDisabled =
    loading ||
    !form.name.trim() ||
    !form.description.trim() ||
    !form.price ||
    isNaN(parseFloat(form.price)) ||
    !form.quantity ||
    isNaN(parseInt(form.quantity)) ||
    !form.category ||
    !form.image;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <ShoppingCart size={32} />
              </div>
              Product Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your products and inventory efficiently
            </p>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700 font-semibold shadow-sm"
          >
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "upload"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Upload size={20} />
            Upload Product
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "products"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Package size={20} />
            View Products ({products.length})
          </button>
        </div>

        {/* Upload Product Form */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Plus size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <p className="text-gray-600">Fill in the details to add a new product</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Package size={20} className="text-blue-600" />
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <FileText size={20} className="text-blue-600" />
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50 resize-vertical"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    <DollarSign size={20} className="text-green-600" />
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                    <Hash size={20} className="text-purple-600" />
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <FolderOpen size={20} className="text-orange-600" />
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-50"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <ImageIcon size={20} className="text-pink-600" />
                  Product Image <span className="text-red-500">*</span>
                </label>

                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-64 h-64 object-cover rounded-2xl border-2 border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-all duration-200 shadow-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-all duration-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <ImageIcon size={64} className="text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-700 font-semibold text-lg mb-2">
                        Click to upload product image
                      </div>
                      <div className="text-gray-500 text-sm">
                        PNG, JPG, JPEG up to 5MB
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Form
                </button>
                
                <button 
                  type="submit" 
                  disabled={isSubmitDisabled}
                  className={`flex-1 px-6 py-4 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitDisabled ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  } flex items-center justify-center gap-3 shadow-lg`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        {activeTab === "products" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
                                  <p className="text-gray-600">{filteredProducts.length} products found</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-80 bg-gray-50"
                  />
                </div>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg whitespace-nowrap"
                >
                  <Plus size={20} />
                  Add New Product
                </button>
              </div>
            </div>

            {productsLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <Package size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-semibold mb-3">
                  {searchTerm ? "No products found" : "No products yet"}
                </h3>
                <p className="text-lg">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by uploading your first product!"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredProducts.map((product) => {
                  const imageUrl = getImageUrl(product.image);

                  return (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-200 bg-white group"
                    >
                      {/* Image Container */}
                      <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <ImageIcon size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-2 text-green-600 font-bold">
                            <DollarSign size={16} />
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                          <span className="flex items-center gap-2 text-blue-600 font-semibold">
                            <Hash size={16} />
                            {product.quantity} in stock
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <FolderOpen size={16} />
                            {product.Category?.name || "Uncategorized"}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
                          title="View Product"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="p-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all duration-200 shadow-sm"
                          title="Edit Product"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-sm"
                          title="Delete Product"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

