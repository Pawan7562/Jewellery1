import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-dark-brown font-light mb-8">About Elliot & Mater</h1>
            <p className="text-lg text-dark-brown/70 max-w-3xl leading-relaxed">
              For over two decades, we have been creating timeless jewelry pieces that celebrate life's most precious moments. Our artisans combine traditional craftsmanship with modern design to create pieces that become cherished heirlooms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop"
                alt="Jewelry craftsmanship"
                className="w-full h-auto shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl text-dark-brown font-light mb-6">Our Heritage</h2>
              <p className="text-lg text-dark-brown/70 leading-relaxed mb-6">
                Founded in 2002, Elliot & Mater began as a small workshop in the heart of the city. Our founders, two master jewelers with a shared passion for exceptional craftsmanship, set out to create jewelry that would stand the test of time.
              </p>
              <p className="text-lg text-dark-brown/70 leading-relaxed mb-8">
                Today, we continue that tradition, handcrafting each piece with the same attention to detail and commitment to quality that defined our earliest work.
              </p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: 'Years of Excellence', value: '22+' },
                  { label: 'Artisans', value: '15' },
                  { label: 'Happy Customers', value: '50K+' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl text-dark-brown font-semibold mb-2">{stat.value}</p>
                    <p className="text-sm text-dark-brown/60 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Our Values</p>
            <h2 className="text-4xl md:text-5xl text-dark-brown font-light">What We Stand For</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Craftsmanship',
                description: 'Every piece is meticulously handcrafted by our skilled artisans using traditional techniques passed down through generations.',
              },
              {
                title: 'Sustainability',
                description: 'We source all our materials from ethical suppliers who share our commitment to environmental responsibility.',
              },
              {
                title: 'Quality',
                description: 'We never compromise on quality. Each piece undergoes rigorous inspection to ensure it meets our exacting standards.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="text-center p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
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

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-dark-brown font-light mb-6">Experience Our Craftsmanship</h2>
            <p className="text-lg text-dark-brown/70 mb-8">
              Visit our showroom or explore our collection online to discover pieces that will become part of your story.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-dark-brown text-cream px-12 py-5 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
