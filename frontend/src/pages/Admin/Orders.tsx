import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Eye, Download, Truck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AdminOrders = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const orders = [
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 3450, date: '2024-01-15', status: 'Completed', items: 2 },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 825, date: '2024-01-14', status: 'Processing', items: 1 },
    { id: 'ORD-003', customer: 'Bob Johnson', email: 'bob@example.com', total: 1250, date: '2024-01-14', status: 'Pending', items: 1 },
    { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', total: 690, date: '2024-01-13', status: 'Completed', items: 1 },
    { id: 'ORD-005', customer: 'Charlie Wilson', email: 'charlie@example.com', total: 4140, date: '2024-01-13', status: 'Shipped', items: 3 },
    { id: 'ORD-006', customer: 'Diana Prince', email: 'diana@example.com', total: 2100, date: '2024-01-12', status: 'Processing', items: 2 },
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Admin Panel</p>
          <h1 className="text-4xl md:text-5xl text-dark-brown font-light">Order Management</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-brown/40" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown focus:border-dark-brown outline-none transition-colors"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="border-2 border-gray-200 px-6 py-3 text-xs uppercase tracking-[0.25em] text-dark-brown hover:border-dark-brown transition-colors flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-50 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Order ID</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Customer</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Date</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Items</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Total</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Status</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="py-4 px-6 text-dark-brown font-medium">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-dark-brown">{order.customer}</p>
                      <p className="text-dark-brown/60 text-sm">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-dark-brown/60">{order.date}</td>
                  <td className="py-4 px-6 text-dark-brown/60">{order.items}</td>
                  <td className="py-4 px-6 text-dark-brown font-semibold">${order.total.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs uppercase tracking-wider ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-dark-brown/60 hover:text-dark-brown transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-dark-brown/60 hover:text-dark-brown transition-colors" title="Mark as Shipped">
                        <Truck size={16} />
                      </button>
                      <button className="p-2 text-dark-brown/60 hover:text-dark-brown transition-colors" title="Download Invoice">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-dark-brown/60 text-sm">Showing 1-{filteredOrders.length} of {orders.length} orders</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Previous</button>
            <button className="px-4 py-2 bg-dark-brown text-white">1</button>
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">2</button>
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
