"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Component/Sidebar";
import { 
  Upload, 
  Package, 
  DollarSign, 
  Hash, 
  FileText, 
  FolderOpen,
  Image as ImageIcon,
  Plus,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  X,
  Loader
} from "lucide-react";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      
      // Create image preview
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("CategoryId", form.category);
    formData.append("image", form.image);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
      
    } catch (err) {
      console.error("Error uploading:", err);
      alert("❌ Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      {/* Sidebar on the left */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div style={{ 
        flex: 1, 
        padding: "2rem", 
        overflowY: "auto",
        background: "#f8fafc"
      }}>
        {/* Success Message */}
        {showSuccess && (
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#10b981",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
            zIndex: 1000,
            animation: "slideIn 0.3s ease-out"
          }}>
            <CheckCircle size={20} />
            <span style={{ fontWeight: "600" }}>Product added successfully!</span>
          </div>
        )}

        {/* Header */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
          border: "1px solid #e2e8f0"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              padding: "0.75rem",
              backgroundColor: "#3b82f6",
              borderRadius: "12px",
              color: "white"
            }}>
              <ShoppingBag size={28} />
            </div>
            <div>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1e293b",
                margin: 0
              }}>
                Upload New Product
              </h1>
              <p style={{
                color: "#64748b",
                margin: 0,
                fontSize: "1rem"
              }}>
                Add a new product to your inventory
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0"
        }}>
          <form
            onSubmit={handleSubmit}
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "2rem",
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            {/* Product Name */}
            <div>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem",
                fontWeight: "600", 
                color: "#374151", 
                marginBottom: "0.75rem",
                fontSize: "1rem"
              }}>
                <Package size={20} />
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  backgroundColor: "#f8fafc"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem",
                fontWeight: "600", 
                color: "#374151", 
                marginBottom: "0.75rem",
                fontSize: "1rem"
              }}>
                <FileText size={20} />
                Product Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the product features, specifications, and benefits..."
                value={form.description}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                  backgroundColor: "#f8fafc",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
                }}
              />
            </div>

            {/* Price and Quantity Row */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "1.5rem" 
            }}>
              {/* Price */}
              <div>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem",
                  fontWeight: "600", 
                  color: "#374151", 
                  marginBottom: "0.75rem",
                  fontSize: "1rem"
                }}>
                  <DollarSign size={20} />
                  Price
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    style={{
                      width: "100%",
                      padding: "1rem 1.25rem 1rem 3rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      backgroundColor: "#f8fafc"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.backgroundColor = "white";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.backgroundColor = "#f8fafc";
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                    fontWeight: "500"
                  }}>
                    $
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem",
                  fontWeight: "600", 
                  color: "#374151", 
                  marginBottom: "0.75rem",
                  fontSize: "1rem"
                }}>
                  <Hash size={20} />
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "#f8fafc"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.backgroundColor = "#f8fafc";
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem",
                fontWeight: "600", 
                color: "#374151", 
                marginBottom: "0.75rem",
                fontSize: "1rem"
              }}>
                <FolderOpen size={20} />
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  backgroundColor: "#f8fafc",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%236b7280' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "12px"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
                }}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem",
                fontWeight: "600", 
                color: "#374151", 
                marginBottom: "0.75rem",
                fontSize: "1rem"
              }}>
                <ImageIcon size={20} />
                Product Image
              </label>
              
              {imagePreview ? (
                <div style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid #e2e8f0"
                }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "rgba(239, 68, 68, 0.9)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "1rem"
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div style={{
                  border: "2px dashed #d1d5db",
                  borderRadius: "12px",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  backgroundColor: "#f8fafc",
                  cursor: "pointer"
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.backgroundColor = "#eff6ff";
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <ImageIcon size={48} color="#9ca3af" style={{ margin: "0 auto 1rem" }} />
                    <div style={{ color: "#374151", fontWeight: "600", marginBottom: "0.5rem" }}>
                      Click to upload product image
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      PNG, JPG, JPEG up to 5MB
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              marginTop: "1rem" 
            }}>
              <button 
                type="button"
                onClick={resetForm}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "1rem 2rem",
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  opacity: loading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Reset Form
              </button>
              
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  flex: 2,
                  padding: "1rem 2rem",
                  backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: loading ? "none" : "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 12px -2px rgba(59, 130, 246, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = loading ? "none" : "0 4px 6px -1px rgba(59, 130, 246, 0.3)";
                }}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="spin" />
                    Uploading Product...
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
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Page;