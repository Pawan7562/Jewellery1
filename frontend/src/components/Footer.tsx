import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl text-dark-brown font-light mb-4">Join Our Newsletter</h3>
              <p className="text-dark-brown/60 text-base">Subscribe for exclusive offers, new arrivals, and jewelry care tips.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white border border-gray-200 px-6 py-4 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-dark-brown text-white px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-light text-dark-brown mb-6 tracking-[0.2em] uppercase">
              Elliot & Mater
            </h3>
            <p className="text-dark-brown/60 text-sm leading-relaxed mb-6 max-w-md">
              Handcrafted luxury jewelry celebrating life's most precious moments since 2002. Each piece tells a story of beauty, craftsmanship, and enduring love.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-dark-brown/40" />
                <p className="text-dark-brown/60 text-sm">123 Jewelry Lane, New York, NY 10001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-dark-brown/40" />
                <p className="text-dark-brown/60 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-dark-brown/40" />
                <p className="text-dark-brown/60 text-sm">hello@elliotmater.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-dark-brown/60 hover:bg-dark-brown hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-dark-brown/60 hover:bg-dark-brown hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-dark-brown/60 hover:bg-dark-brown hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-dark-brown/60 hover:bg-dark-brown hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-dark-brown font-medium mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  All Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-dark-brown font-medium mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-dark-brown font-medium mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-dark-brown/60 hover:text-dark-brown text-xs transition-colors">
                  Jewelry Care
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck size={20} className="text-dark-brown" />
              </div>
              <div>
                <p className="text-dark-brown font-medium text-sm">Free Shipping</p>
                <p className="text-dark-brown/50 text-xs">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw size={20} className="text-dark-brown" />
              </div>
              <div>
                <p className="text-dark-brown font-medium text-sm">Easy Returns</p>
                <p className="text-dark-brown/50 text-xs">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-dark-brown" />
              </div>
              <div>
                <p className="text-dark-brown font-medium text-sm">Secure Payment</p>
                <p className="text-dark-brown/50 text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard size={20} className="text-dark-brown" />
              </div>
              <div>
                <p className="text-dark-brown font-medium text-sm">Flexible Payment</p>
                <p className="text-dark-brown/50 text-xs">Multiple options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-brown/40 text-xs">
              © 2024 Elliot & Mater Jewelry. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-dark-brown/40 hover:text-dark-brown text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-dark-brown/40 hover:text-dark-brown text-xs transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-dark-brown/40 hover:text-dark-brown text-xs transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
