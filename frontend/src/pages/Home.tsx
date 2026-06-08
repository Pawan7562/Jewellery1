import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Home = () => {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
            alt="Jewelry hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/50 mb-6">Luxury Jewelry Collection</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-dark-brown mb-8 leading-[1.1] tracking-tight">
                Timeless Elegance
              </h1>
              <p className="text-lg md:text-xl text-dark-brown/70 mb-10 leading-relaxed">
                Discover handcrafted jewelry pieces designed to celebrate your most precious moments. Each creation tells a story of beauty, craftsmanship, and enduring love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3 bg-dark-brown text-cream px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Shop Collection
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-3 border-2 border-dark-brown text-dark-brown px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown hover:text-cream transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Curated Selection</p>
            <h2 className="text-4xl md:text-5xl text-dark-brown mb-4 font-light">Featured Pieces</h2>
            <p className="text-dark-brown/60 text-base">Handpicked favorites from our collection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: 'Aurora Diamond Solitaire Ring', price: 3450, category: 'Ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop' },
              { id: 2, name: 'Celeste Rose Gold Hoop Earrings', price: 690, category: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop' },
              { id: 3, name: 'Meridian Platinum Cuff Bracelet', price: 1250, category: 'Bracelet', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop' },
              { id: 4, name: 'Luna Sapphire Pendant Necklace', price: 825, category: 'Necklace', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop' },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group"
              >
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
                            addToCart({ ...product, image: product.image })
                          }}
                          className="flex-1 bg-white text-dark-brown py-3 text-xs uppercase tracking-wider hover:bg-dark-brown hover:text-white transition-colors shadow-lg"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            addToWishlist({ ...product, image: product.image })
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-dark-brown text-cream px-14 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop"
                  alt="Jewelry craftsmanship"
                  className="w-full h-auto shadow-2xl"
                />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-dark-brown/10 rounded-full -z-10" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-dark-brown/5 rounded-full -z-10" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-6">Our Heritage</p>
              <h2 className="text-4xl md:text-5xl text-dark-brown mb-8 font-light leading-tight">Crafted with Purpose</h2>
              <p className="text-lg text-dark-brown/70 leading-relaxed mb-6">
                For over two decades, Elliot & Mater has been creating timeless jewelry pieces that celebrate life's most precious moments. Our artisans combine traditional craftsmanship with modern design to create pieces that become cherished heirlooms.
              </p>
              <p className="text-lg text-dark-brown/70 leading-relaxed mb-8">
                Each piece is meticulously handcrafted using ethically sourced materials, ensuring that your jewelry not only looks beautiful but also carries a story of responsibility and care.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-dark-brown text-sm uppercase tracking-[0.25em] hover:text-dark-brown/70 transition-colors border-b-2 border-dark-brown pb-1"
              >
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Our Commitment</p>
            <h2 className="text-4xl md:text-5xl text-dark-brown font-light">The Elliot & Mater Promise</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Ethically Sourced', description: 'All our gemstones and metals are responsibly sourced from certified suppliers who share our commitment to ethical practices.' },
              { title: 'Custom Design', description: 'Work with our artisans to create bespoke pieces with detailed sketches and 3D previews before crafting begins.' },
              { title: 'Lifetime Care', description: 'Every piece comes with complimentary lifetime cleaning, inspection, and repair services to ensure lasting beauty.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="text-center p-8 bg-cream hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-dark-brown/5 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-dark-brown rounded-full" />
                </div>
                <h3 className="text-xl text-dark-brown font-medium mb-4">{item.title}</h3>
                <p className="text-dark-brown/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
