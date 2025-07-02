
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-blue-900 py-20"
    >
      {/* Animated background blobs - matching Hero style */}
      <div className="absolute inset-0 z-0">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/20 px-6 py-3 rounded-full mb-6">
            <span className="text-red-600 dark:text-red-400 text-sm font-semibold uppercase tracking-wide">CONTACT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et
            nous vous répondrons dès que possible.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Email
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    contact@pegasio.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Téléphone
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    +33 1 23 45 67 89
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Adresse
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    123 Rue des Affaires, Suite 100
                    <br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Suivez-nous
              </h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                  <Facebook className="w-6 h-6 text-red-600 dark:text-red-400" />
                </a>
                <a href="#" className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                  <Twitter className="w-6 h-6 text-red-600 dark:text-red-400" />
                </a>
                <a href="#" className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                  <Instagram className="w-6 h-6 text-red-600 dark:text-red-400" />
                </a>
                <a href="#" className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                  <Linkedin className="w-6 h-6 text-red-600 dark:text-red-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envoyez-nous un message
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  placeholder="Sujet de votre message"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}