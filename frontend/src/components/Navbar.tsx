import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Heart, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { getCartCount } = useCart()
  const { user, logout } = useAuth()
  const cartCount = getCartCount()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jewelry', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-light text-dark-brown tracking-[0.2em] uppercase">
              Elliot & Mater
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-[0.25em] transition-colors ${
                  location.pathname === link.path
                    ? 'text-dark-brown font-medium'
                    : 'text-dark-brown/60 hover:text-dark-brown'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="text-dark-brown/60 hover:text-dark-brown transition-colors">
              <Heart size={18} />
            </Link>
            <Link to="/cart" className="text-dark-brown/60 hover:text-dark-brown transition-colors relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dark-brown text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/account" className="text-dark-brown/60 hover:text-dark-brown transition-colors">
                  <User size={18} />
                </Link>
                <button
                  onClick={logout}
                  className="text-xs uppercase tracking-[0.25em] text-dark-brown/60 hover:text-dark-brown transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-xs uppercase tracking-[0.25em] text-dark-brown/60 hover:text-dark-brown transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dark-brown"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-xs uppercase tracking-[0.25em] ${
                  location.pathname === link.path
                    ? 'text-dark-brown font-medium'
                    : 'text-dark-brown/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-6 pt-6 border-t border-gray-100">
              <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-dark-brown/60">
                <Heart size={18} />
              </Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="text-dark-brown/60 relative">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-dark-brown text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/account" onClick={() => setIsOpen(false)} className="text-dark-brown/60">
                    <User size={18} />
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="text-xs uppercase tracking-[0.25em] text-dark-brown/60"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-[0.25em] text-dark-brown/60">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
