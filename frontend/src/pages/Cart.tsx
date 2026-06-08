import { Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Shopping Cart</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-32">
            <ShoppingBag size={64} className="mx-auto text-dark-brown/30 mb-6" />
            <p className="text-dark-brown/60 text-lg mb-8">Your cart is empty</p>
            <Link to="/products" className="inline-block bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-dark-brown font-medium text-base mb-2">{item.name}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-dark-brown/60 text-sm">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-200 flex items-center justify-center text-dark-brown hover:bg-dark-brown hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-dark-brown w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-200 flex items-center justify-center text-dark-brown hover:bg-dark-brown hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-dark-brown font-semibold text-lg">${item.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-dark-brown/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-8 h-fit shadow-sm">
              <h2 className="text-lg text-dark-brown font-medium mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-dark-brown/60 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-dark-brown/60 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-dark-brown font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
