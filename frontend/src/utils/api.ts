const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || 'An error occurred',
        }
      }

      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
  }

  async getProfile() {
    return this.request('/auth/profile')
  }

  // Products endpoints
  async getProducts() {
    return this.request('/products')
  }

  async getProduct(id: number) {
    return this.request(`/products/${id}`)
  }

  async createProduct(product: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  async updateProduct(id: number, product: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id: number) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    })
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart')
  }

  async addToCart(productId: number, quantity: number) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async updateCartItem(itemId: number, quantity: number) {
    return this.request(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  }

  async removeFromCart(itemId: number) {
    return this.request(`/cart/${itemId}`, {
      method: 'DELETE',
    })
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    })
  }

  // Wishlist endpoints
  async getWishlist() {
    return this.request('/wishlist')
  }

  async addToWishlist(productId: number) {
    return this.request('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    })
  }

  async removeFromWishlist(itemId: number) {
    return this.request(`/wishlist/${itemId}`, {
      method: 'DELETE',
    })
  }

  // Orders endpoints
  async getOrders() {
    return this.request('/orders')
  }

  async getOrder(id: number) {
    return this.request(`/orders/${id}`)
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async updateOrderStatus(id: number, status: string) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // Admin endpoints
  async getAllOrders() {
    return this.request('/admin/orders')
  }

  async getAllUsers() {
    return this.request('/admin/users')
  }

  async updateUserRole(id: number, role: string) {
    return this.request(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    })
  }
}

export const api = new ApiClient(API_BASE_URL)
