"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/kd.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'About', href: '/About', icon: '👑' },
    { name: 'Collection', href: '/Collections', icon: '👗' },
    { name: 'Kids', href: '/Kids', icon: '✨' },
    { name: 'Women', href: '/Women', icon: '👩' },
    { name: 'Men', href: '/Mens', icon: '👨' },
    { name: 'Contact', href: '/Contactus', icon: '📞' },
  ];

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 fixed w-full z-50 top-0 start-0 border-b border-teal-100 dark:border-teal-900 shadow-lg backdrop-blur-xl">
      <div className="max-w-8xl flex flex-wrap items-center justify-between mx-auto px-6 py-3">
        {/* Logo Section */}
        <Link href="/" className="flex ml-10  items-center space-x-4 rtl:space-x-reverse group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-amber-500 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-60"></div>
            <Image
              src={logo}
              alt="Khalid Dress Logo"
              width={56}
              height={56}
              className="relative z-10 h-14 w-auto rounded-xl shadow-xl group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 border-2 border-white/20"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-amber-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
              Khalid Dress
            </span>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-widest uppercase mt-1">
              Luxury Fashion House
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                activeItem === item.name
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </span>
              
              {activeItem === item.name ? (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-amber-500 rounded-xl shadow-lg transform scale-105"></div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              {/* Animated underline */}
              <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
                activeItem === item.name ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              }`}></div>
            </Link>
          ))}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center mr-10 space-x-4">
          <Link
            href="/get-started"
            className="hidden sm:flex relative px-8 py-3 bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white font-bold rounded-full text-sm transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Shop Collection</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-amber-400 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative p-3 w-12 h-12 bg-gradient-to-br from-teal-500/10 to-amber-500/10 border border-teal-200 dark:border-teal-800 rounded-2xl text-teal-600 dark:text-teal-400 hover:from-teal-500/20 hover:to-amber-500/20 transition-all duration-300 shadow-lg"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-6 h-6 relative transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-2 -translate-y-0.5'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current top-3 transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-4 translate-y-0.5'
                }`}></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pt-4 pb-8 space-y-3 bg-gradient-to-b from-white/95 to-teal-50/95 dark:from-gray-900/95 dark:to-teal-950/95 backdrop-blur-xl border-t border-teal-100 dark:border-teal-900">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveItem(item.name);
                setIsMenuOpen(false);
              }}
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 group ${
                activeItem === item.name
                  ? 'text-white bg-gradient-to-r from-teal-500 to-amber-500 shadow-xl transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
              <svg className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                activeItem === item.name ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
          
          <Link
            href="/get-started"
            className="flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mt-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Explore Collection</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animated Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 via-amber-400 to-transparent opacity-40 animate-pulse"></div>
    </nav>
  );
};

export default Header;