import { createContext, useContext, ReactNode, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

// Initialize Stripe with your publishable key
// In production, this should come from environment variables
const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here')

interface PaymentContextType {
  stripe: Stripe | null
  stripePromise: Promise<Stripe | null>
  isProcessing: boolean
  processPayment: (paymentMethodId: string, amount: number) => Promise<{ success: boolean; error?: string }>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Load Stripe on mount
  useState(() => {
    stripePromise.then((stripeInstance) => {
      setStripe(stripeInstance)
    })
  })

  const processPayment = async (paymentMethodId: string, amount: number) => {
    setIsProcessing(true)
    try {
      // In production, this would call your backend to create a payment intent
      // For now, we'll simulate the payment process
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          amount: amount * 100, // Convert to cents
          currency: 'usd',
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Confirm the payment on the client side
        if (stripe) {
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
              payment_method: paymentMethodId,
            }
          )

          if (error) {
            return { success: false, error: error.message }
          }

          if (paymentIntent.status === 'succeeded') {
            return { success: true }
          }
        }
      }

      return { success: false, error: 'Payment failed' }
    } catch (error) {
      console.error('Payment error:', error)
      return { success: false, error: 'Payment processing failed' }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        stripe,
        stripePromise,
        isProcessing,
        processPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}
