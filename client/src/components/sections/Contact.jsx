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
      {/* Background animation elements */}
      <div className="absolute inset-0 z-0">
        <div className="blob blob1 animate-pulse-slow"></div>
        <div className="blob blob2 animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/20 px-6 py-3 rounded-full mb-6 animate-fadeIn">
            <span className="text-red-600 dark:text-red-400 text-sm font-semibold uppercase tracking-wide">CONTACT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white animate-fadeIn delay-100">
            Contactez-nous
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-fadeIn delay-200">
            Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information Cards */}
          <div className="space-y-8">
            {[
              {
                icon: <Mail className="w-8 h-8 text-red-600 dark:text-red-400" />,
                title: "Email",
                detail: "contact@pegasio.com",
              },
              {
                icon: <Phone className="w-8 h-8 text-red-600 dark:text-red-400" />,
                title: "Téléphone",
                detail: "+33 1 23 45 67 89",
              },
              {
                icon: <MapPin className="w-8 h-8 text-red-600 dark:text-red-400" />,
                title: "Adresse",
                detail: (
                  <>
                    123 Rue des Affaires, Suite 100 <br />
                    75001 Paris, France
                  </>
                ),
              },
            ].map(({ icon, title, detail }, i) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 text-md">{detail}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Suivez-nous
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook />, href: "#", label: "Facebook" },
                  { icon: <Twitter />, href: "#", label: "Twitter" },
                  { icon: <Instagram />, href: "#", label: "Instagram" },
                  { icon: <Linkedin />, href: "#", label: "LinkedIn" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group relative w-11 h-11 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-800 transition-all"
                  >
                    {React.cloneElement(icon, {
                      className: "w-5 h-5 text-red-600 dark:text-red-400 transition-all group-hover:scale-110",
                    })}
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Envoyez-nous un message
            </h3>
            <form className="space-y-5">
              {[
                {
                  label: "Nom complet",
                  name: "name",
                  type: "text",
                  placeholder: "Votre nom",
                  required: true,
                },
                {
                  label: "Adresse email",
                  name: "email",
                  type: "email",
                  placeholder: "votre@email.com",
                  required: true,
                },
                {
                  label: "Sujet",
                  name: "subject",
                  type: "text",
                  placeholder: "Sujet de votre message",
                  required: true,
                },
              ].map(({ label, name, type, placeholder, required }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
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
