"use client";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setCategories([...categories, newCategory]);
        setName("");
      } else {
        alert("Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter(cat => cat.id !== id));
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Error deleting category");
    }
  };

  // Start editing
  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  // Update category
  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (res.ok) {
        const updatedCategory = await res.json();
        setCategories(categories.map(cat => 
          cat.id === id ? updatedCategory : cat
        ));
        setEditingId(null);
        setEditName("");
      } else {
        alert("Failed to update category");
      }
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Error updating category");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              📂
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Category Management</h1>
              <p className="text-slate-600">Manage your product categories</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Category Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Add New Category
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Electronics, Clothing..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    disabled={loading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Category...</span>
                    </div>
                  ) : (
                    "➕ Add Category"
                  )}
                </button>
              </form>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                    <div className="text-sm text-slate-600">Total Categories</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {categories.filter(cat => cat.name && cat.name.length > 0).length}
                    </div>
                    <div className="text-sm text-slate-600">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Existing Categories
                  <span className="ml-3 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    {categories.length} items
                  </span>
                </h2>
              </div>

              <div className="p-6">
                {categories.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">📂</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No categories yet</h3>
                    <p className="text-slate-500">Add your first category to get started!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category, index) => (
                      <div
                        key={category.id}
                        className="group relative bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                      >
                        {editingId === category.id ? (
                          // Edit Mode
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              autoFocus
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdate(category.id)}
                                className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="flex-1 bg-slate-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                  {category.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-800">{category.name}</h3>
                                  <p className="text-xs text-slate-500">ID: {category.id}</p>
                                </div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => startEditing(category)}
                                    className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                                    title="Edit"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDelete(category.id)}
                                    className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Category #{index + 1}</span>
                              <span>{category.name.length} chars</span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;