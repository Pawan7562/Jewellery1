import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, ShoppingBag, Share2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductDetail = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  // Sample products data - in production this would come from API
  const products: any[] = [
    {
      id: 1,
      name: 'Aurora Diamond Solitaire Ring',
      price: 3450,
      category: 'Ring',
      description: 'A stunning solitaire ring featuring a brilliant-cut diamond set in 18k white gold. This timeless piece captures light from every angle, creating a mesmerizing sparkle that symbolizes eternal love and commitment.',
      materials: '18k White Gold, 1.5ct Diamond',
      dimensions: 'Size 7 (resizable)',
      care: 'Clean with mild soap and warm water. Avoid harsh chemicals and store in a soft cloth pouch.',
      images: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 2,
      name: 'Celeste Rose Gold Hoop Earrings',
      price: 690,
      category: 'Earrings',
      description: 'Elegant hoop earrings crafted in 18k rose gold with a subtle hammered texture that catches the light beautifully.',
      materials: '18k Rose Gold',
      dimensions: 'Diameter: 2 inches',
      care: 'Clean with soft cloth, avoid harsh chemicals',
      images: [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 3,
      name: 'Meridian Platinum Cuff Bracelet',
      price: 1250,
      category: 'Bracelet',
      description: 'A sophisticated platinum cuff bracelet with a minimalist design that exudes modern elegance.',
      materials: 'Platinum 950',
      dimensions: 'Width: 8mm, Size: Medium',
      care: 'Polish with platinum cloth periodically',
      images: [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 4,
      name: 'Luna Sapphire Pendant Necklace',
      price: 825,
      category: 'Necklace',
      description: 'A captivating pendant featuring a deep blue sapphire set in sterling silver on a delicate chain.',
      materials: 'Sterling Silver, Sapphire',
      dimensions: 'Chain length: 18 inches',
      care: 'Clean with silver polishing cloth',
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 5,
      name: 'Horizon Emerald Tennis Bracelet',
      price: 2150,
      category: 'Bracelet',
      description: 'A stunning tennis bracelet featuring lab-created emeralds set in 14k white gold.',
      materials: '14k White Gold, Lab-Created Emeralds',
      dimensions: 'Length: 7.5 inches',
      care: 'Clean with mild soap and warm water',
      images: [
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 6,
      name: 'Stellar Diamond Stud Earrings',
      price: 980,
      category: 'Earrings',
      description: 'Classic diamond stud earrings featuring brilliant-cut diamonds in a secure four-prong setting.',
      materials: '14k White Gold, Diamonds',
      dimensions: 'Diamond size: 0.5ct each',
      care: 'Clean with jewelry cleaner and soft brush',
      images: [
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 7,
      name: 'Nova Gold Band Ring',
      price: 450,
      category: 'Ring',
      description: 'A simple yet elegant gold band ring perfect for everyday wear or stacking.',
      materials: '14k Yellow Gold',
      dimensions: 'Band width: 3mm, Size 7',
      care: 'Polish with gold polishing cloth',
      images: [
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&angle=135'
      ]
    },
    {
      id: 8,
      name: 'Celestial Pearl Necklace',
      price: 550,
      category: 'Necklace',
      description: 'A delicate pearl necklace featuring freshwater pearls on a fine gold chain.',
      materials: '14k Gold, Freshwater Pearls',
      dimensions: 'Chain length: 16 inches',
      care: 'Wipe with soft cloth after wearing, avoid water',
      images: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&angle=45',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&angle=90',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&angle=135'
      ]
    }
  ]

  const product = products.find(p => p.id === Number(id)) || products[0]
  const images = product?.images || products[0].images

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      category: product.category,
    })
  }

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-50 mb-6 overflow-hidden shadow-lg">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 overflow-hidden transition-all shadow-sm hover:shadow-md ${
                    selectedImage === index ? 'ring-2 ring-dark-brown' : 'hover:ring-1 ring-dark-brown/30'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">{product.category}</p>
            <h1 className="text-3xl md:text-4xl text-dark-brown font-light mb-4">{product.name}</h1>
            <p className="text-2xl text-dark-brown font-semibold mb-8">${product.price.toLocaleString()}</p>
            
            <p className="text-dark-brown/60 mb-8 leading-relaxed text-base">{product.description}</p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-4">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-gray-200 flex items-center justify-center text-dark-brown hover:bg-dark-brown hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="text-dark-brown w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-gray-200 flex items-center justify-center text-dark-brown hover:bg-dark-brown hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`w-14 h-14 border border-gray-200 flex items-center justify-center transition-colors ${isInWishlist(product.id) ? 'bg-red-50 text-red-500 border-red-200' : 'text-dark-brown hover:bg-dark-brown hover:text-white'}`}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
              <button className="w-14 h-14 border border-gray-200 flex items-center justify-center text-dark-brown hover:bg-dark-brown hover:text-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-100 pt-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-dark-brown/40 mb-2">Materials</p>
                <p className="text-dark-brown/60 text-sm">{product.materials}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-dark-brown/40 mb-2">Dimensions</p>
                <p className="text-dark-brown/60 text-sm">{product.dimensions}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-dark-brown/40 mb-2">Care Instructions</p>
                <p className="text-dark-brown/60 text-sm">{product.care}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
