import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    destinations: [
      { name: 'Rome', href: '/destinations/rome' },
      { name: 'Paris', href: '/destinations/paris' },
      { name: 'Barcelona', href: '/destinations/barcelona' },
      { name: 'Amsterdam', href: '/destinations/amsterdam' },
      { name: 'View All', href: '/destinations' }
    ],
    activities: [
      { name: 'Cultural Tours', href: '/activities/cultural' },
      { name: 'Adventure', href: '/activities/adventure' },
      { name: 'Food & Drink', href: '/activities/food' },
      { name: 'Nature & Wildlife', href: '/activities/nature' },
      { name: 'Water Activities', href: '/activities/water' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-hostvue-dark text-white" style={{ backgroundColor: '#2C2C2C' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}
              >
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl">TourExplorer</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover amazing tourism experiences around the world. From cultural tours to adventure activities, 
              we help you create unforgettable memories with local experts.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-hostvue-primary" style={{ color: '#D87441' }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-hostvue-primary" style={{ color: '#D87441' }} />
                <span>hello@tourexplorer.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-hostvue-primary" style={{ color: '#D87441' }} />
                <span>Available 24/7 worldwide</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-hostvue-accent" style={{ color: '#E89A6B' }}>Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-hostvue-primary transition-colors duration-200"
                    style={{ color: '#D1D5DB' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-hostvue-accent" style={{ color: '#E89A6B' }}>Activities</h3>
            <ul className="space-y-2">
              {footerLinks.activities.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-hostvue-primary transition-colors duration-200"
                    style={{ color: '#D1D5DB' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-hostvue-accent" style={{ color: '#E89A6B' }}>Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-hostvue-primary transition-colors duration-200"
                    style={{ color: '#D1D5DB' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-md">
            <h3 className="font-semibold text-lg mb-2 text-hostvue-accent" style={{ color: '#E89A6B' }}>Stay Updated</h3>
            <p className="text-gray-300 mb-4">Get the latest deals and travel inspiration delivered to your inbox.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-hostvue-primary"
                style={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
              />
              <button 
                className="bg-hostvue-primary hover:bg-hostvue-secondary text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                style={{ backgroundColor: '#D87441' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900" style={{ backgroundColor: '#111827', borderColor: '#374151' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} TourExplorer. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-hostvue-primary transition-colors duration-200"
                    style={{ color: '#9CA3AF' }}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
