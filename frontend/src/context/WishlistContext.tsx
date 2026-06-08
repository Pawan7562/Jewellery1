import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '../utils/api'

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = async (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(i => i.id === item.id)) {
        return prevItems
      }
      return [...prevItems, item]
    })

    try {
      await api.addToWishlist(item.id)
    } catch (error) {
      console.log('Backend sync failed, using local state')
    }
  }

  const removeFromWishlist = async (id: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id))

    try {
      await api.removeFromWishlist(id)
    } catch (error) {
      console.log('Backend sync failed, using local state')
    }
  }

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
