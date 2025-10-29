"use client";
import React, { useState } from "react";
import Link from "next/link"; // Use Next.js Link for client-side navigation
import { usePathname } from "next/navigation"; // to detect active route

const Sidebar = () => {
  const pathname = usePathname(); // get current path for active menu
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard", link: "/Dashboard" },
    { id: "mens", icon: "👔", label: "Men's Fashion", link: "/Mens" },
    { id: "womens", icon: "👗", label: "Women's Fashion", link: "/Women" },
    { id: "kids", icon: "👶", label: "Kids & Baby", link: "/Kids" },
    { id: "category", icon: "📂", label: "Categories", link: "/Category" },
    { id: "products", icon: "🛒", label: "Products", link: "/Product" },
  ];

  const adminItems = [
    { id: "users", icon: "👤", label: "Users", link: "/users" },
    { id: "orders", icon: "📦", label: "Orders", link: "/orders" },
    { id: "analytics", icon: "📈", label: "Analytics", link: "/analytics" },
    { id: "settings", icon: "⚙️", label: "Settings", link: "/settings" },
  ];

  const quickActions = [
    {
      icon: "➕",
      label: "Add Product",
      link: "/add-product",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "🎯",
      label: "Featured",
      link: "/featured",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: "🔥",
      label: "Hot Deals",
      link: "/hot-deals",
      color: "from-orange-500 to-red-600",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Helper: check if link is active by pathname
  const isActive = (link) => pathname.toLowerCase() === link.toLowerCase();

  return (
    <aside
      className={`
      flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white
      border-r border-slate-700 transition-all duration-300 ease-in-out
      ${isSidebarCollapsed ? "w-20" : "w-64"}
    `}
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white text-xl shadow-lg">
            🛍️
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                E-Store
              </h2>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-all duration-200 hover:scale-105"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Quick Actions */}
      {!isSidebarCollapsed && (
        <div className="p-4 border-b border-slate-700/30">
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={`flex flex-col items-center p-2 rounded-xl bg-gradient-to-br ${action.color} text-white transition-all duration-200 hover:scale-105 hover:shadow-lg text-center`}
              >
                <span className="text-lg mb-1">{action.icon}</span>
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4" aria-label="Primary navigation">
        {/* Main Menu Section */}
        <div className="mb-6">
          <div className={`px-6 pb-3 ${isSidebarCollapsed ? "text-center" : ""}`}>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {isSidebarCollapsed ? "•" : "SHOP"}
            </span>
          </div>
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`
                    flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group
                    border-l-4 ${
                      isActive(item.link)
                        ? "bg-blue-500/20 border-l-blue-400 text-white shadow-md"
                        : "border-l-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-l-blue-300/50"
                    }
                  `}
                  aria-current={isActive(item.link) ? "page" : undefined}
                >
                  <span className="text-xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="flex-1 text-sm font-medium ml-3">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin Section */}
        <div className="mb-6">
          <div className={`px-6 pb-3 ${isSidebarCollapsed ? "text-center" : ""}`}>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {isSidebarCollapsed ? "•" : "ADMIN"}
            </span>
          </div>
          <ul className="space-y-1 px-3">
            {adminItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`
                    flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group
                    border-l-4 ${
                      isActive(item.link)
                        ? "bg-purple-500/20 border-l-purple-400 text-white shadow-md"
                        : "border-l-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-l-purple-300/50"
                    }
                  `}
                  aria-current={isActive(item.link) ? "page" : undefined}
                >
                  <span className="text-xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="flex-1 text-sm font-medium ml-3">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <footer className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-slate-600">
              AU
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          )}
        </div>
        {!isSidebarCollapsed && (
          <button
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 hover:scale-105 group"
            onClick={() => alert("Logout action here")} // Add real logout handler here
            type="button"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform duration-200">
              🚪
            </span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        )}
      </footer>
    </aside>
  );
};

export default Sidebar;
