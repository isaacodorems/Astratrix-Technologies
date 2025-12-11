
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import GeminiChatWidget from './GeminiChatWidget';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Custom SVG Logo Component
  const AstratrixLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Dark Blue Back Shape (The 'A' structure) */}
      <path d="M50 10 L80 90 L50 75 L20 90 L50 10 Z" fill="#0EA5E9" />
      <path d="M50 10 L65 50 L35 50 L50 10 Z" fill="#38BDF8" opacity="0.5" />
      
      {/* Cyan/Light Blue Cross Checkmark */}
      <path d="M15 45 L50 70 L95 30 L50 60 L15 45 Z" fill="#06B6D4" />
      <path d="M15 45 L50 70 L50 60 L15 45 Z" fill="#22D3EE" opacity="0.8" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-mist bg-evergreen selection:bg-azure selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <AstratrixLogo className="h-10 w-10 transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-logo font-bold text-gray-900 tracking-[0.2em] leading-none group-hover:text-azure transition-colors">
                  ASTRATRIX
                </span>
                <span className="text-[10px] md:text-xs font-logo font-bold text-gray-500 tracking-[0.4em] leading-none mt-1">
                  TECHNOLOGIES
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-azure font-semibold'
                          : 'text-gray-600 hover:text-azure hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <NavLink
                to="/contact"
                className="bg-azure text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-ocean transition-all transform hover:scale-105 shadow-[0_4px_14px_0_rgba(14,165,233,0.39)]"
              >
                Get Started
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-azure hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-azure bg-gray-50'
                        : 'text-gray-600 hover:text-azure hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className="block w-full text-center mt-4 bg-azure text-white px-5 py-3 rounded-md font-bold hover:bg-ocean"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-seagreen border-t border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <AstratrixLogo className="h-12 w-12" />
                <div className="flex flex-col">
                  <span className="text-2xl font-logo font-bold text-gray-900 tracking-widest">
                    ASTRATRIX
                  </span>
                  <span className="text-xs font-logo font-bold text-gray-500 tracking-[0.3em]">
                    TECHNOLOGIES
                  </span>
                </div>
              </div>
              <p className="text-gray-600 max-w-sm mb-6">
                Unlock growth with modern AI tools, automation, and analytics. 
                Built for the realities of African business.
              </p>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><NavLink to="/about" className="text-gray-600 hover:text-azure transition-colors">About Us</NavLink></li>
                <li><NavLink to="/solutions" className="text-gray-600 hover:text-azure transition-colors">Our Solutions</NavLink></li>
                <li><NavLink to="/blog" className="text-gray-600 hover:text-azure transition-colors">Latest Insights</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-bold mb-4">Contact</h3>
              <address className="text-gray-600 not-italic space-y-2">
                <p>26 Health Center Road</p>
                <p>Okuru, Port Harcourt, Nigeria</p>
                <p className="mt-4 text-azure font-bold">+234 816051409601</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Astratrix Technologies. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-azure transition-colors">Privacy</a>
              <a href="#" className="hover:text-azure transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <GeminiChatWidget />
    </div>
  );
};

export default Layout;
