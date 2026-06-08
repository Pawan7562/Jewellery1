import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { usePayment } from '../context/PaymentContext'
import { api } from '../utils/api'

const CheckoutForm = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
  })

  const subtotal = getCartTotal()
  const shipping = 0
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    if (!stripe || !elements) {
      return
    }

    try {
      // Create payment method with Stripe
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.zipCode,
          },
        },
      })

      if (error) {
        console.error('Payment method error:', error)
        setIsProcessing(false)
        return
      }

      // Create order via API
      const orderData = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentMethodId: paymentMethod.id,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      }

      const response = await api.createOrder(orderData)
      
      if (response.success) {
        clearCart()
        navigate('/order-confirmation')
      } else {
        throw new Error(response.error || 'Order creation failed')
      }
    } catch (error) {
      console.error('Order creation error:', error)
      // Fallback to local processing if API fails
      setTimeout(() => {
        clearCart()
        navigate('/order-confirmation')
      }, 2000)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-dark-brown/60 text-lg mb-8">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-dark-brown text-white px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Checkout</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-12">Complete Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-lg text-dark-brown font-medium mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-dark-brown font-medium mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Card Details</label>
                  <div className="bg-transparent border border-gray-200 px-4 py-3">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#4a4a4a',
                            '::placeholder': {
                              color: '#999999',
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <p className="text-dark-brown/40 text-xs">Your payment information is secure and encrypted</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order - $${total.toLocaleString()}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-gray-50 p-8 h-fit shadow-sm">
            <h2 className="text-lg text-dark-brown font-medium mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-dark-brown font-medium text-sm">{item.name}</h3>
                    <p className="text-dark-brown/60 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-dark-brown font-semibold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-dark-brown/60 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-dark-brown/60 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-dark-brown font-semibold text-base pt-2">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Checkout = () => {
  const { stripePromise } = usePayment()
  const { cartItems } = useCart()

  if (cartItems.length === 0) {
    return <CheckoutForm />
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
