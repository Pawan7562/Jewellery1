import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Edit, Trash2, Shield, User as UserIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AdminUsers = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', orders: 5, joined: '2024-01-10', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', orders: 12, joined: '2024-01-08', status: 'Active' },
    { id: 3, name: 'Admin User', email: 'admin@elliotmater.com', role: 'admin', orders: 0, joined: '2024-01-01', status: 'Active' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'customer', orders: 3, joined: '2024-01-12', status: 'Active' },
    { id: 5, name: 'Alice Brown', email: 'alice@example.com', role: 'customer', orders: 8, joined: '2024-01-05', status: 'Inactive' },
    { id: 6, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'customer', orders: 15, joined: '2024-01-03', status: 'Active' },
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Admin Panel</p>
          <h1 className="text-4xl md:text-5xl text-dark-brown font-light">User Management</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-brown/40" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown focus:border-dark-brown outline-none transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button className="border-2 border-gray-200 px-6 py-3 text-xs uppercase tracking-[0.25em] text-dark-brown hover:border-dark-brown transition-colors flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-gray-50 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">User</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Email</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Role</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Orders</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Joined</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Status</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-dark-brown/10 rounded-full flex items-center justify-center">
                        <UserIcon size={18} className="text-dark-brown/50" />
                      </div>
                      <span className="text-dark-brown font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-dark-brown/60">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? <Shield size={14} /> : null}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-dark-brown/60">{user.orders}</td>
                  <td className="py-4 px-6 text-dark-brown/60">{user.joined}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-dark-brown/60 hover:text-dark-brown transition-colors" title="Edit User">
                        <Edit size={16} />
                      </button>
                      {user.role !== 'admin' && (
                        <button className="p-2 text-dark-brown/60 hover:text-red-500 transition-colors" title="Delete User">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-dark-brown/60 text-sm">Showing 1-{filteredUsers.length} of {users.length} users</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Previous</button>
            <button className="px-4 py-2 bg-dark-brown text-white">1</button>
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
