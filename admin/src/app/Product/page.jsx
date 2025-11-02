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
  X,
} from "lucide-react";

const API_BASE_URL = "http://localhost:4000";

const AdminPage = () => {
  // data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // all, we will filter client-side
  const [products, setProducts] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // forms: upload form
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    subCategoryId: "",
    image: null,
  });

  // edit modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    subCategoryId: "",
    image: null, // file
  });
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // fetch initial
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/subcategories`);
      const data = await res.json();
      setSubcategories(data || []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  // helpers
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      subCategoryId: "",
      image: null,
    });
    setImagePreview(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // backend now returns full URL for uploaded images; handle both cases
    if (typeof imagePath === "string" && (imagePath.startsWith("http://") || imagePath.startsWith("https://"))) {
      return imagePath;
    }
    return `${API_BASE_URL}/${imagePath}`; // fallback
  };

  // upload form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({ ...p, image: file }));
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const removeImage = () => {
    setForm((p) => ({ ...p, image: null }));
    setImagePreview(null);
  };

  // submit upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name.trim()) return alert("Please enter product name");
    if (!form.description.trim()) return alert("Please enter description");
    if (!form.price || isNaN(parseFloat(form.price))) return alert("Please enter valid price");
    if (!form.quantity || isNaN(parseInt(form.quantity))) return alert("Please enter valid quantity");
    if (!form.categoryId) return alert("Please select a category");
    if (!form.subCategoryId) return alert("Please select a subcategory");
    if (!form.image) return alert("Please upload an image");

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("description", form.description.trim());
    fd.append("price", parseFloat(form.price));
    fd.append("quantity", parseInt(form.quantity, 10));
    fd.append("categoryId", form.categoryId);
    fd.append("subCategoryId", form.subCategoryId);
    fd.append("image", form.image);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || res.statusText || "Upload failed");
      }

      await res.json();
      alert("Product added successfully ✅");
      resetForm();
      fetchProducts();
      setActiveTab("products");
    } catch (err) {
      console.error(err);
      alert("Upload error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // delete
  const deleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || res.statusText || "Delete failed");
      }
      alert("Product deleted ✅");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  // search & filter
  const filteredProducts = products.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      p.category?.name?.toLowerCase().includes(term) ||
      p.subcategory?.name?.toLowerCase().includes(term)
    );
  });

  // ---------- Edit Flow ----------
  const openEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      id: product.id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      quantity: product.quantity || "",
      categoryId: product.category?.id || product.Category?.id || "",
      subCategoryId: product.subcategory?.id || product.SubCategory?.id || "",
      image: null, // if user uploads new one, we replace; otherwise backend keeps old
    });
    // preview existing image
    setEditImagePreview(getImageUrl(product.image));
  };

  const closeEdit = () => {
    setEditingProduct(null);
    setEditForm({
      id: null,
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      subCategoryId: "",
      image: null,
    });
    setEditImagePreview(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditForm((p) => ({ ...p, image: file }));
    setEditImagePreview(URL.createObjectURL(file));
  };

  const removeEditImage = () => {
    setEditForm((p) => ({ ...p, image: null }));
    setEditImagePreview(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return alert("Enter product name");
    if (!editForm.description.trim()) return alert("Enter description");
    if (!editForm.price || isNaN(parseFloat(editForm.price))) return alert("Enter valid price");
    if (!editForm.quantity || isNaN(parseInt(editForm.quantity))) return alert("Enter valid quantity");
    if (!editForm.categoryId) return alert("Select category");
    if (!editForm.subCategoryId) return alert("Select subcategory");

    const fd = new FormData();
    fd.append("name", editForm.name.trim());
    fd.append("description", editForm.description.trim());
    fd.append("price", parseFloat(editForm.price));
    fd.append("quantity", parseInt(editForm.quantity, 10));
    fd.append("categoryId", editForm.categoryId);
    fd.append("subCategoryId", editForm.subCategoryId);
    if (editForm.image) fd.append("image", editForm.image);

    setEditLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${editForm.id}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || res.statusText || "Update failed");
      }
      await res.json();
      alert("Product updated ✅");
      closeEdit();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // helper to get subcategories for a category (client-side)
  const subcatsFor = (catId) => subcategories.filter((s) => String(s.categoryId) === String(catId));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <ShoppingCart size={28} />
              </div>
              Product Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your products, categories and subcategories
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchProducts}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-700 font-semibold shadow-sm"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
            <button
              onClick={() => {
                setActiveTab("upload");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 transition font-semibold shadow-sm"
            >
              <Plus size={16} />
              New Product
            </button>
          </div>
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

        {/* Upload Form */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Plus size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <p className="text-gray-600">Fill the form to add a product (category + subcategory required)</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-gray-50" placeholder="Product name" required />
              </div>

              <div>
                <label className="font-semibold text-gray-700 mb-2 block">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 border rounded-xl bg-gray-50" placeholder="Short description" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">Price *</label>
                  <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" min="0" className="w-full px-4 py-3 border rounded-xl bg-gray-50" placeholder="0.00" required />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">Quantity *</label>
                  <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" className="w-full px-4 py-3 border rounded-xl bg-gray-50" placeholder="0" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">Category *</label>
                  <select name="categoryId" value={form.categoryId} onChange={(e) => { handleChange(e); /* clear subcategory when category changes */ setForm((p) => ({ ...p, subCategoryId: "" })); }} className="w-full px-4 py-3 border rounded-xl bg-gray-50" required>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 mb-2 block">Sub-Category *</label>
                  <select name="subCategoryId" value={form.subCategoryId} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl bg-gray-50" required>
                    <option value="">Select subcategory</option>
                    {subcatsFor(form.categoryId).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 mb-2 block">Product Image *</label>

                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover rounded-2xl border-2" />
                    <button type="button" onClick={removeImage} className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50">
                    <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <ImageIcon size={48} className="text-gray-400 mx-auto mb-2" />
                      <div className="text-gray-700 font-semibold">Click to upload</div>
                      <div className="text-gray-500 text-sm">PNG/JPG up to 5MB</div>
                    </label>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-2">
                <button type="button" onClick={resetForm} disabled={loading} className="flex-1 py-3 border rounded-xl">Reset</button>
                <button type="submit" disabled={loading} className={`flex-1 py-3 rounded-xl text-white ${loading ? "bg-gray-400" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}>
                  {loading ? "Uploading..." : (<><Upload size={16} /> <span className="ml-2">Add Product</span></>)}
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

              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative w-full lg:w-80">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border rounded-xl w-full" placeholder="Search products..." />
                </div>

                <button onClick={() => setActiveTab("upload")} className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl">
                  <Plus size={16} /> Add Product
                </button>
              </div>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-semibold mb-2">{searchTerm ? "No products found" : "No products yet"}</h3>
                <p className="text-lg">{searchTerm ? "Try different search terms" : "Add your first product from Upload tab"}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredProducts.map((product) => {
                  const imageUrl = getImageUrl(product.image);
                  return (
                    <div key={product.id} className="flex items-start gap-4 p-4 border rounded-xl hover:shadow-sm">
                      <div className="w-28 h-28 rounded-lg bg-gray-100 border overflow-hidden flex items-center justify-center">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                        ) : (
                          <ImageIcon size={32} className="text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        <div className="flex gap-4 mt-2 text-sm items-center">
                          <span className="text-green-600 font-semibold flex items-center gap-1"><DollarSign size={14}/> {parseFloat(product.price).toFixed(2)}</span>
                          <span className="text-blue-600 font-medium flex items-center gap-1"><Hash size={14}/> {product.quantity}</span>
                          <span className="text-gray-500 flex items-center gap-1"><FolderOpen size={14}/> {product.category?.name || product.Category?.name || "Uncategorized"}</span>
                          <span className="text-gray-400 text-xs ml-2">{product.subcategory?.name || product.SubCategory?.name || ""}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 items-start">
                        <button onClick={() => openEdit(product)} title="Edit" className="p-2 bg-yellow-500 text-white rounded-lg"><Edit/></button>
                        <button onClick={() => { /* view could open modal or navigate */ alert(JSON.stringify(product, null, 2)) }} title="View" className="p-2 bg-blue-600 text-white rounded-lg"><Eye/></button>
                        <button onClick={() => deleteProduct(product.id)} title="Delete" className="p-2 bg-red-600 text-white rounded-lg"><Trash2/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Product</h3>
                <button onClick={closeEdit} className="p-2 rounded-full bg-gray-100"><X/></button>
              </div>

              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-3 py-2 border rounded" placeholder="Name" required />
                <textarea name="description" value={editForm.description} onChange={handleEditChange} rows={4} className="w-full px-3 py-2 border rounded" placeholder="Description" required />
                <div className="grid grid-cols-2 gap-4">
                  <input name="price" value={editForm.price} onChange={handleEditChange} type="number" step="0.01" className="px-3 py-2 border rounded" placeholder="Price" required />
                  <input name="quantity" value={editForm.quantity} onChange={handleEditChange} type="number" className="px-3 py-2 border rounded" placeholder="Quantity" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select name="categoryId" value={editForm.categoryId} onChange={(e) => { handleEditChange(e); setEditForm((p) => ({ ...p, subCategoryId: "" })); }} className="px-3 py-2 border rounded" required>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>

                  <select name="subCategoryId" value={editForm.subCategoryId} onChange={handleEditChange} className="px-3 py-2 border rounded" required>
                    <option value="">Select subcategory</option>
                    {subcatsFor(editForm.categoryId).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Product Image (replace to update)</label>
                  {editImagePreview ? (
                    <div className="relative inline-block">
                      <img src={editImagePreview} alt="edit preview" className="w-40 h-40 object-cover rounded" />
                      <button type="button" onClick={removeEditImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X size={14}/></button>
                    </div>
                  ) : (
                    <div className="p-4 border rounded text-gray-600">No preview</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleEditFileChange} className="mt-2" />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button type="button" onClick={closeEdit} className="px-4 py-2 rounded border">Cancel</button>
                  <button type="submit" disabled={editLoading} className={`px-4 py-2 rounded text-white ${editLoading ? "bg-gray-400" : "bg-blue-600"}`}>
                    {editLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
