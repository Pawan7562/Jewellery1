import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Package, Users, ShoppingCart, TrendingUp, Plus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Sales', value: '$45,230', icon: TrendingUp, change: '+12%' },
    { label: 'Orders', value: '128', icon: ShoppingCart, change: '+8%' },
    { label: 'Products', value: '45', icon: Package, change: '+3' },
    { label: 'Customers', value: '892', icon: Users, change: '+15%' },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: '$3,450', status: 'Completed' },
    { id: 'ORD-002', customer: 'Jane Smith', total: '$825', status: 'Processing' },
    { id: 'ORD-003', customer: 'Bob Johnson', total: '$1,250', status: 'Pending' },
    { id: 'ORD-004', customer: 'Alice Brown', total: '$690', status: 'Completed' },
  ]

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-dark-brown/60 text-lg mb-8">Access denied. Admin privileges required.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Admin Panel</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={24} className="text-dark-brown" />
                <span className="text-sm text-dark-brown/60">{stat.change}</span>
              </div>
              <p className="text-2xl text-dark-brown font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-dark-brown/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-50 p-8 shadow-sm mb-8">
          <h2 className="text-xl text-dark-brown font-medium mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4">Order ID</th>
                  <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4">Customer</th>
                  <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4">Total</th>
                  <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="py-4 text-dark-brown">{order.id}</td>
                    <td className="py-4 text-dark-brown">{order.customer}</td>
                    <td className="py-4 text-dark-brown">{order.total}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-xs uppercase tracking-wider ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="border-2 border-dark-brown text-dark-brown py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Manage Orders
          </Link>
          <Link
            to="/admin/users"
            className="border-2 border-dark-brown text-dark-brown py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Users size={16} />
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
