import { Link } from 'react-router-dom'
import { CheckCircle, ShoppingBag, Home } from 'lucide-react'

const OrderConfirmation = () => {
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24">
      <div className="max-w-2xl w-full mx-4 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Order Confirmed</p>
          <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-4">Thank You!</h1>
          <p className="text-dark-brown/60 text-lg">Your order has been successfully placed</p>
        </div>

        <div className="bg-gray-50 p-8 mb-8 shadow-sm">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.25em] text-dark-brown/40 mb-2">Order Number</p>
            <p className="text-2xl text-dark-brown font-semibold">{orderNumber}</p>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-dark-brown/60 text-sm mb-2">
              A confirmation email has been sent to your email address with your order details.
            </p>
            <p className="text-dark-brown/60 text-sm">
              You can track your order status in your account.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-3 bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
          >
            <ShoppingBag size={16} />
            View Order
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-3 border-2 border-dark-brown text-dark-brown px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown hover:text-white transition-colors"
          >
            <Home size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
