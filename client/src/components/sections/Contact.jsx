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
      className="relative z-10 py-20 px-8 max-w-6xl mx-auto dark:bg-gray-950 bg-gray-100 transition-colors duration-300"
    >
      {/* 🔴 Glowing Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* 🔖 Heading */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full mb-6">
          <span className="text-red-400 text-sm font-medium">CONTACT</span>
        </div>
        <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Contactez-nous
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et
          nous vous répondrons dès que possible.
        </p>
      </div>

      {/* 🧊 Content */}
      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        {/* 📫 Contact Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                contact@pegasio.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                Téléphone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                +33 1 23 45 67 89
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                Adresse
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                123 Rue des Affaires, Suite 100
                <br />
                75001 Paris, France
              </p>
            </div>
          </div>
        </div>

        {/* 📝 Contact Form */}
        <form className="space-y-4 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
          <input
            type="text"
            placeholder="Nom"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500"
          />
          <textarea
            rows="5"
            placeholder="Votre message"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
