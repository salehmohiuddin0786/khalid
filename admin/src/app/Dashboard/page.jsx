"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:4000/api/categories"),
          fetch("http://localhost:4000/api/products"),
        ]);

        const categories = await catRes.json();
        const latestProducts = await prodRes.json();

        setStats({
          categories: categories.length,
          products: latestProducts.length,
        });

        setProducts(latestProducts.slice(0, 5)); // ✅ Latest 5
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">📊 Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-blue-100 p-6 rounded-xl text-center shadow">
            <h2 className="text-4xl font-bold text-blue-700">{stats.categories}</h2>
            <p className="text-slate-700 mt-2">Total Categories</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-xl text-center shadow">
            <h2 className="text-4xl font-bold text-pink-700">{stats.products}</h2>
            <p className="text-slate-700 mt-2">Total Products</p>
          </div>
        </div>

        {/* Latest Products */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">🆕 Latest Products</h2>
        <div className="overflow-auto rounded-lg shadow border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {products.length > 0 ? (
                products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-6 py-4">
                      <img
                        src={prod.image} // ✅ Fixed
                        alt={prod.name}
                        onError={(e) => (e.target.src = "/no-image.png")}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{prod.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {prod.category?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">${prod.price}</td>
                    <td className="px-6 py-4 text-slate-600">{prod.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
