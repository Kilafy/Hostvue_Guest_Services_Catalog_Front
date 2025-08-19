'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Activities', href: '/activities' },
    { name: 'Tours', href: '/tours' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}
              >
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl text-hostvue-dark" style={{ color: '#2C2C2C' }}>
                TourExplorer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-hostvue-gray hover:text-hostvue-primary font-medium transition-colors duration-200"
                style={{ color: '#6B7280' }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors duration-200" style={{ color: '#6B7280' }}>
              <Search className="h-5 w-5" />
            </button>

            {/* User Account */}
            <button className="p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors duration-200" style={{ color: '#6B7280' }}>
              <User className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button className="p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors duration-200 relative" style={{ color: '#6B7280' }}>
              <ShoppingCart className="h-5 w-5" />
              <span 
                className="absolute -top-1 -right-1 bg-hostvue-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                style={{ backgroundColor: '#D87441' }}
              >
                2
              </span>
            </button>

            {/* CTA Button */}
            <Link
              href="/book"
              className="hidden sm:inline-flex bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 shadow-card hover:shadow-lg"
              style={{ backgroundColor: '#D87441' }}
            >
              Book Now
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors duration-200"
              style={{ color: '#6B7280' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-hostvue-gray hover:text-hostvue-primary font-medium transition-colors duration-200"
                  style={{ color: '#6B7280' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link
                  href="/book"
                  className="block w-full text-center bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: '#D87441' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
