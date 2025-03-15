'use client';

import { Mail, Instagram } from 'lucide-react';
import Link from 'next/link';

const GetinTouch = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Get in Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about our yoga and gym pose correction technology? We're here to help you achieve your fitness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
                    placeholder="Your email address"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="plans">Pricing Plans</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-neutral-700 text-gray-800 dark:text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Subscribe to our newsletter for tips and updates
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">+911234567843</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Monday-Friday, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">support@yogaposecorrector.com</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white">Office</h4>
                      <p className="text-gray-600 dark:text-gray-300">new delhi</p>
                      <p className="text-gray-600 dark:text-gray-300">new Delhi , india</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Follow Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Stay connected with us on social media for tips, updates, and special offers.</p>
                <div className="flex space-x-4">
                  <a href="mailto:support@yogaposecorrector.com" className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300">
                    <Instagram className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </a>
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="mt-8 bg-indigo-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <p className="mb-4">Can't find the answer you're looking for? Check our comprehensive FAQ section or contact our support team.</p>
                <Link href="#faq-section" className="inline-flex items-center font-semibold text-white hover:text-indigo-100 transition-colors duration-300">
                  View FAQs
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetinTouch;