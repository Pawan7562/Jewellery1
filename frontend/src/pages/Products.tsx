import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, SlidersHorizontal, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets']

  const products = [
    { id: 1, name: 'Aurora Diamond Solitaire Ring', price: 3450, category: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop' },
    { id: 2, name: 'Celeste Rose Gold Hoop Earrings', price: 690, category: 'earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop' },
    { id: 3, name: 'Meridian Platinum Cuff Bracelet', price: 1250, category: 'bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop' },
    { id: 4, name: 'Luna Sapphire Pendant Necklace', price: 825, category: 'necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop' },
    { id: 5, name: 'Horizon Emerald Tennis Bracelet', price: 2150, category: 'bracelets', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=500&fit=crop' },
    { id: 6, name: 'Stellar Diamond Stud Earrings', price: 980, category: 'earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=500&fit=crop' },
    { id: 7, name: 'Nova Gold Band Ring', price: 450, category: 'rings', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=500&fit=crop' },
    { id: 8, name: 'Celestial Pearl Necklace', price: 550, category: 'necklaces', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=500&fit=crop' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Shop Collection</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Our Jewelry</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors ${
                  selectedCategory === category
                    ? 'bg-dark-brown text-white'
                    : 'border border-gray-200 text-dark-brown/60 hover:bg-dark-brown hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <SlidersHorizontal size={18} className="text-dark-brown/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-gray-200 px-4 py-3 text-xs uppercase tracking-[0.25em] text-dark-brown/60"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/products/${product.id}`}>
                <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addToCart({ ...product, category: product.category.charAt(0).toUpperCase() + product.category.slice(1) })
                        }}
                        className="flex-1 bg-white text-dark-brown py-3 text-xs uppercase tracking-wider hover:bg-dark-brown hover:text-white transition-colors shadow-lg"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addToWishlist({ ...product, category: product.category.charAt(0).toUpperCase() + product.category.slice(1) })
                        }}
                        className={`bg-white p-3 transition-colors shadow-lg ${isInWishlist(product.id) ? 'text-red-500' : 'hover:bg-dark-brown hover:text-white'}`}
                      >
                        <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to={`/products/${product.id}`}>
                <h3 className="text-dark-brown font-medium text-base mb-2 group-hover:text-dark-brown/80 transition-colors">{product.name}</h3>
              </Link>
              <p className="text-dark-brown/50 text-xs uppercase tracking-widest mb-2">{product.category}</p>
              <p className="text-dark-brown font-semibold text-lg">${product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
