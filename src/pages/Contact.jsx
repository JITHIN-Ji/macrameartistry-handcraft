import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white py-20 px-6 mt-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900">Get In </span>
            <span className="text-cyan-500">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600"
          >
            We'd love to hear from you. Reach out with any questions or inquiries.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form and Info Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">Address</p>
                      <p className="text-gray-600 leading-relaxed">
                        123 Artisan Lane<br />
                        Craft City, CC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">📞</div>
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">Phone</p>
                      <a 
                        href="tel:+15551234567" 
                        className="text-gray-600 hover:text-cyan-500 transition-colors duration-200 block"
                      >
                        +1 (555) 123-4567
                      </a>
                      <p className="text-gray-500 text-sm mt-2">
                        Mon - Fri: 9:00 AM - 6:00 PM EST<br />
                        Sat: 10:00 AM - 4:00 PM EST
                      </p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">✉️</div>
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">Email</p>
                      <div className="space-y-1">
                        <a 
                          href="mailto:hello@macrameartistry.com" 
                          className="text-gray-600 hover:text-cyan-500 transition-colors duration-200 block"
                        >
                          hello@macrameartistry.com
                        </a>
                        <a 
                          href="mailto:support@macrameartistry.com" 
                          className="text-gray-600 hover:text-cyan-500 transition-colors duration-200 block"
                        >
                          support@macrameartistry.com
                        </a>
                        <a 
                          href="mailto:orders@macrameartistry.com" 
                          className="text-gray-600 hover:text-cyan-500 transition-colors duration-200 block"
                        >
                          orders@macrameartistry.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🕐</div>
                    <div>
                      <p className="text-gray-900 font-semibold mb-2">Business Hours</p>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                        <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    🐦
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Custom Order">Custom Order</option>
                    <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-200"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 5-7 business days. Expedited options are available at checkout. International orders may take 2-3 weeks."
              },
              {
                question: "Do you offer custom orders?",
                answer: "Yes! We love custom projects. Contact us with your specific requirements and we'll provide a quote. Typically takes 2-4 weeks depending on complexity."
              },
              {
                question: "What's your return policy?",
                answer: "We offer 30-day returns for all items in original condition. Please contact our support team to initiate a return."
              },
              {
                question: "Are your products sustainable?",
                answer: "Absolutely! All our materials are 100% natural, organic, and ethically sourced. We're committed to environmentally responsible practices."
              },
              {
                question: "How do I care for my macrame?",
                answer: "Dust gently with a soft brush or use a low-heat hair dryer. For deeper cleaning, hand wash with mild soap. Avoid direct sunlight to prevent fading."
              },
              {
                question: "Do you offer wholesale pricing?",
                answer: "Yes! For bulk orders and wholesale inquiries, please email wholesale@macrameartistry.com with your requirements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;