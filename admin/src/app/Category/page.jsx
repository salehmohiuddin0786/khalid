"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Sidebar from "../Component/Sidebar";
import {
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Package,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const Category = () => {
  // States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false); // for fetch loading

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProducts: 0,
    averageProducts: 0,
  });

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setLoadingFetch(true);
    try {
      const res = await fetch("http://localhost:4000/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Error fetching categories");
      console.error(err);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoadingFetch(true);
    try {
      const res = await fetch("http://localhost:4000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Error fetching products");
      console.error(err);
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // Calculate stats
  useEffect(() => {
    const totalCategories = categories.length;
    const totalProducts = products.length;
    const averageProducts =
      totalCategories > 0 ? (totalProducts / totalCategories).toFixed(1) : 0;

    setStats({ totalCategories, totalProducts, averageProducts });
  }, [categories, products]);

  // Count products by category ID (case insensitive to id or Id)
  const getProductCount = useCallback(
    (categoryId) => {
      return products.filter(
        (product) =>
          product.CategoryId === categoryId || product.categoryId === categoryId
      ).length;
    },
    [products]
  );

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Please enter a category name");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName.trim() }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      const newCategory = await res.json();
      setCategories((prev) => [...prev, newCategory]);
      setCategoryName("");
    } catch (err) {
      alert(err.message || "Error adding category");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add subcategory
  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !selectedCategoryId) {
      alert("Please select a category and enter a subcategory name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/categories/subcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subcategoryName.trim(),
          categoryId: selectedCategoryId,
        }),
      });

      if (!res.ok) throw new Error("Failed to add subcategory");

      setSubcategoryName("");
      setSelectedCategoryId("");
      fetchCategories(); // refresh categories list with new subcategory
    } catch (err) {
      alert(err.message || "Error adding subcategory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const productCount = getProductCount(id);
    if (productCount > 0) {
      return alert(
        `Cannot delete category with ${productCount} product(s). Please remove products first.`
      );
    }

    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      alert(err.message || "Error deleting category");
      console.error(err);
    }
  };

  // Edit category
  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return alert("Please enter a category name");

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (!res.ok) throw new Error("Failed to update category");

      const updatedCategory = await res.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      setEditingId(null);
      setEditName("");
    } catch (err) {
      alert(err.message || "Error updating category");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data handler
  const refreshData = () => {
    fetchCategories();
    fetchProducts();
  };

  // Memoized filtered categories for performance
  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [categories, searchTerm]
  );

  // Product count badge colors
  const getProductCountColor = (count) => {
    if (count === 0)
      return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
    if (count <= 5) return { bg: "#fffbeb", text: "#d97706", border: "#fed7aa" };
    if (count <= 20) return { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" };
    return { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" };
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                  <FolderOpen size={32} />
                </div>
                Category Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Organize and manage your product categories and subcategories
              </p>
              {error && (
                <p className="text-red-600 mt-2 font-semibold">Error: {error}</p>
              )}
            </div>
            <button
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium"
              disabled={loadingFetch}
            >
              <RefreshCw size={20} />
              {loadingFetch ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Categories</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalCategories}
                  </h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FolderOpen size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Products</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalProducts}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Package size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Average Products per Category
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.averageProducts}
                  </h3>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <BarChart3 size={24} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loadingFetch}
            />
          </div>

          {/* Add/Edit Category Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={20} />
              {editingId ? "Edit Category" : "Add New Category"}
            </h2>
            <form
              onSubmit={
                editingId
                  ? (e) => {
                      e.preventDefault();
                      handleUpdate(editingId);
                    }
                  : handleAddCategory
              }
              className="flex gap-4 flex-col md:flex-row"
            >
              <input
                type="text"
                placeholder="Enter category name..."
                value={editingId ? editName : categoryName}
                onChange={(e) =>
                  editingId ? setEditName(e.target.value) : setCategoryName(e.target.value)
                }
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              {!editingId ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-semibold"
                >
                  {loading ? "Saving..." : "Add Category"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleUpdate(editingId)}
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={loading}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Add Subcategory Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={20} />
              Add New Subcategory
            </h2>
            <form onSubmit={handleAddSubcategory} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading || editingId !== null}
              >
                <option value="">Select Parent Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter subcategory name..."
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading || editingId !== null}
              />
              <button
                type="submit"
                disabled={loading || editingId !== null}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold"
              >
                {loading ? "Saving..." : "Add Subcategory"}
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FolderOpen size={24} />
              Categories
            </h2>

            <div className="space-y-4">
              {filteredCategories.length === 0 ? (
                <p className="text-gray-500">No categories found.</p>
              ) : (
                filteredCategories.map((category) => {
                  const productCount = getProductCount(category.id);
                  const colors = getProductCountColor(productCount);

                  return (
                    <div
                      key={category.id}
                      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>

                        <div className="flex items-center gap-2">
                          <span
                            className="px-3 py-1 rounded-full text-sm font-semibold border"
                            style={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              borderColor: colors.border,
                            }}
                          >
                            {productCount} Product{productCount !== 1 ? "s" : ""}
                          </span>

                          <button
                            onClick={() => startEditing(category)}
                            title="Edit"
                            className="p-2 hover:text-indigo-600 transition-colors duration-200"
                            disabled={loading}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            title="Delete"
                            className="p-2 hover:text-red-600 transition-colors duration-200"
                            disabled={loading}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ul className="mt-3 list-disc list-inside text-gray-700 pl-4">
                          {category.subcategories.map((sub) => (
                            <li key={sub.id}>{sub.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
