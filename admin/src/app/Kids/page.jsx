"use client";
import React, { useState, useEffect } from "react";

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

  // 🔹 Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // 🔹 Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 Handle file input
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert("Please upload an image");

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
      alert("✅ Product added successfully!");
      console.log("Product:", data);
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: null,
      });
    } catch (err) {
      console.error("Error uploading:", err);
      alert("❌ Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>🧥 Upload Product</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Page;
