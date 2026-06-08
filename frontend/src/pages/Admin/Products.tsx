import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AdminProducts = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const products = [
    { id: 1, name: 'Aurora Diamond Solitaire Ring', price: 3450, category: 'Ring', stock: 15, status: 'Active' },
    { id: 2, name: 'Celeste Rose Gold Hoop Earrings', price: 690, category: 'Earrings', stock: 23, status: 'Active' },
    { id: 3, name: 'Meridian Platinum Cuff Bracelet', price: 1250, category: 'Bracelet', stock: 8, status: 'Active' },
    { id: 4, name: 'Luna Sapphire Pendant Necklace', price: 825, category: 'Necklace', stock: 12, status: 'Active' },
    { id: 5, name: 'Stellar Diamond Stud Earrings', price: 980, category: 'Earrings', stock: 5, status: 'Low Stock' },
    { id: 6, name: 'Nova Gold Band Ring', price: 450, category: 'Ring', stock: 0, status: 'Out of Stock' },
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Admin Panel</p>
            <h1 className="text-4xl md:text-5xl text-dark-brown font-light">Product Management</h1>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-dark-brown text-white px-6 py-3 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-brown/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
            />
          </div>
          <button className="border-2 border-gray-200 px-6 py-3 text-xs uppercase tracking-[0.25em] text-dark-brown hover:border-dark-brown transition-colors flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-gray-50 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Product</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Category</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Price</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Stock</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Status</th>
                <th className="text-left text-xs uppercase tracking-[0.25em] text-dark-brown/60 pb-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-dark-brown/10 rounded overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-dark-brown font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-dark-brown/60">{product.category}</td>
                  <td className="py-4 px-6 text-dark-brown font-semibold">${product.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-dark-brown/60">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs uppercase tracking-wider ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-dark-brown/60 hover:text-dark-brown transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-dark-brown/60 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
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
          <p className="text-dark-brown/60 text-sm">Showing 1-{filteredProducts.length} of {products.length} products</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Previous</button>
            <button className="px-4 py-2 bg-dark-brown text-white">1</button>
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">2</button>
            <button className="px-4 py-2 border border-gray-200 text-dark-brown/60 hover:border-dark-brown transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl text-dark-brown font-light mb-6">Add New Product</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Product Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Category</label>
                  <select className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown focus:border-dark-brown outline-none transition-colors">
                    <option>Ring</option>
                    <option>Necklace</option>
                    <option>Earrings</option>
                    <option>Bracelet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Price</label>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Stock Quantity</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Description</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Product Images</label>
                <div className="border-2 border-dashed border-gray-200 p-8 text-center">
                  <p className="text-dark-brown/60 text-sm">Drag and drop images here or click to upload</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 border-2 border-dark-brown text-dark-brown py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
