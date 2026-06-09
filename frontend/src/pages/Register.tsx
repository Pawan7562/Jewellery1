import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      
      if (!firstName || !lastName) {
        setError('Please enter both first and last name')
        return
      }
      
      await register(firstName, lastName, email, password)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-4">
        <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4 text-center">Join Us</p>
        <h1 className="text-4xl md:text-5xl text-dark-brown mb-8 text-center font-light">Create Account</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-dark-brown/60 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-dark-brown font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
