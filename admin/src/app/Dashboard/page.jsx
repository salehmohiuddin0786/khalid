"use client";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
  });
  const [products, setProducts] = useState([]);

  // 🔹 Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:4000/api/categories"),
          fetch("http://localhost:4000/api/products"),
        ]);

        const categories = await catRes.json();
        const products = await prodRes.json();

        setStats({
          categories: categories.length,
          products: products.length,
        });

        // Show only latest 5 products
        setProducts(products.slice(-5).reverse());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "#e3f2fd",
            padding: "1rem",
            borderRadius: "8px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h2>{stats.categories}</h2>
          <p>Categories</p>
        </div>

        <div
          style={{
            background: "#fce4ec",
            padding: "1rem",
            borderRadius: "8px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h2>{stats.products}</h2>
          <p>Products</p>
        </div>
      </div>

      <h2>🆕 Latest Products</h2>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img
                    src={`http://localhost:5000/${prod.image}`}
                    alt={prod.name}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                </td>
                <td>{prod.name}</td>
                <td>{prod.CategoryId}</td>
                <td>${prod.price}</td>
                <td>{prod.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
