import React from "react";
import { Check, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";


export default function Contact() {
  return (
   <section id="contacts" className="relative z-10 py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full mb-6">
            <span className="text-red-400 text-sm font-medium">CONTACT</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-400 text-lg">Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <p className="text-gray-400">contact@pegasio.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                <p className="text-gray-400">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Adresse</h3>
                <p className="text-gray-400">123 Rue des Affaires, Suite 100<br />75001 Paris, France</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className=" space-y-4">
          <input
            type="text"
            placeholder="Nom"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            rows="5"
            placeholder="Votre message"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
          >
            Envoyer
          </button>
        </form>
        </div>
      </section>
  );
}
