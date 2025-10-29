"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Component/Sidebar";
import {
  Upload,
  Shirt,
  DollarSign,
  Hash,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Plus,
  X,
  Loader,
  Layers,
  CheckCircle,
} from "lucide-react";

const Mens = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    subCategory: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mensProducts, setMensProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories", err));
  }, []);

  useEffect(() => {
    if (!form.category) {
      setSubCategories([]);
      setForm((prev) => ({ ...prev, subCategory: "" }));
      return;
    }
    fetch(`http://localhost:4000/api/categories/${form.category}/subcategories`)
      .then((res) => res.json())
      .then((data) => setSubCategories(data))
      .catch((err) => console.error("Error loading subcategories:", err));
  }, [form.category]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products?gender=Men")
      .then((res) => res.json())
      .then((data) => setMensProducts(data))
      .catch((err) => console.error("Error loading men’s products:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, image: file }));

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      subCategory: "",
      image: null,
    });
    setImagePreview(null);
    setUploadProgress(0);
  };

  const quickFillExample = () => {
    setForm((prev) => ({
      ...prev,
      name: "Men's Premium Cotton T-Shirt",
      description:
        "High-quality cotton t-shirt with premium finish. Perfect for casual comfort and durability.",
      price: "29.99",
      quantity: "50",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Explicit Validation
    if (
      !form.name ||
      !form.price ||
      !form.quantity ||
      !form.category ||
      !form.subCategory
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (!form.image) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", parseFloat(form.price));
    formData.append("quantity", parseInt(form.quantity, 10));
    formData.append("categoryId", form.category);
    formData.append("subCategoryId", form.subCategory);
    formData.append("gender", "Men");
    formData.append("image", form.image);

    setLoading(true);
    setUploadProgress(10);

    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(`Upload failed: ${errData.message || res.statusText}`);
        clearInterval(progressTimer);
        setLoading(false);
        return;
      }

      const data = await res.json();

      clearInterval(progressTimer);
      setUploadProgress(100);
      setShowSuccess(true);
      setMensProducts((prev) => [...prev, data]);

      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
      }, 2500);
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Product upload failed!");
      clearInterval(progressTimer);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled =
    loading ||
    !form.name ||
    !form.price ||
    !form.quantity ||
    !form.category ||
    !form.subCategory ||
    !form.image;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-500 to-blue-400">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
        {showSuccess && (
          <div className="fixed top-6 right-6 flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-xl shadow-lg animate-slide-in-right">
            <CheckCircle size={22} />
            <span>Product uploaded successfully!</span>
          </div>
        )}

        <header className="bg-white p-10 rounded-3xl shadow-xl mb-10">
          <div className="flex items-center gap-6 mb-3">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white shadow-md">
              <Shirt size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Men's Product Upload
              </h1>
              <p className="text-slate-500">Add premium men’s fashion items</p>
            </div>
          </div>
        </header>

        {loading && (
          <div className="bg-white rounded-2xl p-6 mb-10 shadow-md border">
            <div className="flex items-center gap-3 mb-3">
              <Loader className="animate-spin text-blue-500" size={22} />
              <p className="font-semibold text-slate-800">Uploading product...</p>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-800 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col gap-8"
        >
          <div>
            <label className="flex gap-2 font-semibold text-gray-700 mb-2">
              <Shirt size={18} /> Product Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g., Men's Classic Polo"
              className="w-full px-5 py-3 border rounded-xl bg-slate-50 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="flex gap-2 font-semibold text-gray-700 mb-2">
              <FileText size={18} /> Description{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Describe this men's product..."
              className="w-full px-5 py-3 border rounded-xl bg-slate-50 resize-y focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex gap-2 font-semibold text-gray-700 mb-2">
                <DollarSign size={18} /> Price ($){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-5 py-3 border rounded-xl bg-slate-50 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="flex gap-2 font-semibold text-gray-700 mb-2">
                <Hash size={18} /> Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-5 py-3 border rounded-xl bg-slate-50 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex gap-2 font-semibold text-gray-700 mb-2">
                <FolderOpen size={18} /> Category{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border rounded-xl bg-slate-50 focus:border-blue-500 outline-none"
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
              <label className="flex gap-2 font-semibold text-gray-700 mb-2">
                <Layers size={18} /> Sub-category{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                required
                disabled={!form.category}
                className="w-full px-5 py-3 border rounded-xl bg-slate-50 focus:border-blue-500 outline-none disabled:opacity-60"
              >
                <option value="">
                  {form.category ? "Select Sub-category" : "Select Category First"}
                </option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex gap-2 font-semibold text-gray-700 mb-2">
              <ImageIcon size={18} /> Product Image{" "}
              <span className="text-red-500">*</span>
            </label>
            {imagePreview ? (
              <div className="relative w-64 h-64 border rounded-2xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-9 h-9 flex justify-center items-center"
                >
                  <X />
                </button>
              </div>
            ) : (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFile}
                className="cursor-pointer border-2 border-dashed rounded-xl p-10 text-center w-full bg-blue-50 hover:bg-blue-100"
              />
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 px-6 py-4 border rounded-xl text-gray-700 hover:bg-slate-100"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`flex-[2] px-6 py-4 rounded-xl text-white font-semibold hover:-translate-y-1 transition-all ${
                isSubmitDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-800"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader size={20} className="animate-spin" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Upload size={20} /> Upload Men's Product
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Mens;
