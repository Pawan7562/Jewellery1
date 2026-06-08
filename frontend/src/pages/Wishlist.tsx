import { Heart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Wishlist</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-32">
            <Heart size={64} className="mx-auto text-dark-brown/30 mb-6" />
            <p className="text-dark-brown/60 text-lg mb-8">Your wishlist is empty</p>
            <Link to="/products" className="inline-block bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-white p-2 rounded-full text-dark-brown hover:text-red-500 transition-colors shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-white text-dark-brown py-3 text-xs uppercase tracking-wider hover:bg-dark-brown hover:text-white transition-colors shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <h3 className="text-dark-brown font-medium text-base mb-2 group-hover:text-dark-brown/80 transition-colors">{item.name}</h3>
                <p className="text-dark-brown font-semibold text-lg">${item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
