import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-dark-brown/40 mb-4">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl text-dark-brown font-light mb-4">Contact Us</h1>
          <p className="text-lg text-dark-brown/60">We'd love to hear from you</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl text-dark-brown font-light mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Subject</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-dark-brown mb-3">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-dark-brown placeholder-dark-brown/40 focus:border-dark-brown outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-dark-brown text-white py-4 text-xs uppercase tracking-[0.25em] hover:bg-dark-brown/90 transition-colors shadow-xl hover:shadow-2xl"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl text-dark-brown font-light mb-8">Visit Our Showroom</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-dark-brown" />
                </div>
                <div>
                  <h3 className="text-dark-brown font-medium mb-2">Address</h3>
                  <p className="text-dark-brown/60 leading-relaxed">
                    123 Jewelry Lane<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-dark-brown" />
                </div>
                <div>
                  <h3 className="text-dark-brown font-medium mb-2">Phone</h3>
                  <p className="text-dark-brown/60">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-dark-brown" />
                </div>
                <div>
                  <h3 className="text-dark-brown font-medium mb-2">Email</h3>
                  <p className="text-dark-brown/60">hello@elliotmater.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dark-brown/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-dark-brown" />
                </div>
                <div>
                  <h3 className="text-dark-brown font-medium mb-2">Hours</h3>
                  <p className="text-dark-brown/60 leading-relaxed">
                    Monday - Friday: 10am - 7pm<br />
                    Saturday: 10am - 6pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 bg-gray-50 aspect-video rounded-lg overflow-hidden shadow-sm">
              <div className="w-full h-full flex items-center justify-center text-dark-brown/40">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-sm">Interactive Map</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
