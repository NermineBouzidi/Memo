import { PhoneCall, ChevronRight, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="max-w-5xl mx-auto text-center mb-20">
                <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  Recevoir l'appel d'une <span className="text-[#ef5d81]">attachée commerciale</span> 
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                 Laissez-nous vos coordonnées et une attachée commerciale vous contactera dans les 24h pour étudier votre projet
                </motion.p>
              </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left Call to Action Card */}
          <motion.div
            className="lg:w-2/5 w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-pink-600 to-orange-500 rounded-3xl p-8 shadow-xl shadow-pink-200/50 relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full"></div>
              <div className="absolute top-4 right-6 text-white/20 text-6xl font-serif">“</div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <PhoneCall className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Recevoir l'appel d'une attachée commerciale
                </h3>
                <p className="text-white/90 mb-8">
                  Discutez avec notre équipe pour découvrir comment MEMO peut transformer votre gestion d'entreprise
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-pink-600 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg"
                >
                  Demander un appel <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            className="lg:w-2/4 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Formulaire de contact
              </h3>
              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <div className="flex items-center bg-white rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-pink-500">
                    <User className="text-gray-400 ml-3" size={20} />
                    <input
                      type="text"
                      id="name"
                      placeholder="Votre nom"
                      className="w-full py-3 px-3 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Adresse Email
                  </label>
                  <div className="flex items-center bg-white rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-pink-500">
                    <Mail className="text-gray-400 ml-3" size={20} />
                    <input
                      type="email"
                      id="email"
                      placeholder="exemple@email.com"
                      className="w-full py-3 px-3 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Votre message ici..."
                    rows={5}
                    className="w-full py-3 px-4 bg-white border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-pink-500 outline-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-gradient-to-br from-pink-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
                >
                  Envoyer le message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
