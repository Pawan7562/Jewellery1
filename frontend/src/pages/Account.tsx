import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Account = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-dark-brown/60 text-lg mb-8">Please sign in to view your account</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">My Account</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Welcome, {user.name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 text-sm uppercase tracking-[0.25em] transition-colors ${
                activeTab === 'profile' ? 'bg-dark-brown text-white' : 'text-dark-brown/60 hover:bg-gray-50'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 text-sm uppercase tracking-[0.25em] transition-colors flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-dark-brown text-white' : 'text-dark-brown/60 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag size={18} />
              Orders
            </button>
            <button
              onClick={() => navigate('/wishlist')}
              className="w-full text-left px-4 py-3 text-sm uppercase tracking-[0.25em] text-dark-brown/60 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Heart size={18} />
              Wishlist
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm uppercase tracking-[0.25em] text-dark-brown/60 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-gray-50 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 bg-dark-brown/10 rounded-full flex items-center justify-center">
                    <User size={32} className="text-dark-brown/50" />
                  </div>
                  <div>
                    <h2 className="text-xl text-dark-brown font-medium">{user.name}</h2>
                    <p className="text-dark-brown/60">{user.email}</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-dark-brown text-white px-12 py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-gray-50 p-8 shadow-sm">
                <h2 className="text-2xl text-dark-brown font-light mb-6">Order History</h2>
                <p className="text-dark-brown/60 mb-8">You haven't placed any orders yet.</p>
                <button
                  onClick={() => navigate('/products')}
                  className="bg-dark-brown text-white px-12 py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
