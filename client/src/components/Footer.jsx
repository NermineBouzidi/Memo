import { Link } from "react-router-dom";
import { Facebook, Linkedin, Mail, Phone, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import logoMemo from "../assets/logo.png";
import image360f from "../assets/360f-removebg-preview.png";
import wsm from "../assets/wsm-removebg-preview.png";
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('i18nextLng', e.target.value);
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-white to-orange-50 relative overflow-hidden text-black font-outfit">
      {/* Décorations flottantes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Colonne 1 - Logo + Contact */}
        <div className="space-y-4">
          <img src={logoMemo} alt="Logo MEMO" className="h-12" />
          <p className="text-sm">{t("footer.contact.description")}</p>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="text-[#f1647c]" size={18} />
              <a href={`mailto:${t("footer.contact.email")}`} className="hover:text-[#f1647c]">
                {t("footer.contact.email")}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-[#f1647c]" size={18} />
              <a href={`tel:${t("footer.contact.phone")}`} className="hover:text-[#f1647c]">
                {t("footer.contact.phone")}
              </a>
            </div>
          </div>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footer.nav.title")}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/crp", text: "footer.nav.solution" },
              { to: "/pour-qui", text: "footer.nav.pourQui" },
              { to: "/resultats", text: "footer.nav.resultats" },
              { to: "/ressources", text: "footer.nav.ressources" },
              { to: "/demo", text: "footer.nav.demo" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center group hover:text-[#f1647c] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[#f1647c] opacity-0 group-hover:opacity-100 mr-1" />
                  {t(item.text)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Légal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footer.legal.title")}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/mentions-legales", text: "footer.legal.mentions" },
              { to: "/politique-confidentialite", text: "footer.legal.confidentialite" },
              { to: "/cgu", text: "footer.legal.cgu" },
            ].map((item, index) => (
              <li key={index}>
                <Link to={item.to} className="hover:text-[#f1647c] transition-colors">
                  {t(item.text)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 - Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footer.newsletter.title")}</h3>
          <p className="text-sm mb-4">{t("footer.newsletter.subtitle")}</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#f1647c]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#f1647c] text-white rounded-md hover:bg-[#e13b6b] text-sm transition"
            >
              {t("footer.newsletter.cta")}
            </button>
          </form>
        </div>
      </div>

      {/* Partenaires */}
      <motion.div
        className="relative px-6 pb-4 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className="text-center text-2xl font-bold mb-8 text-gray-900">
          {t("footer.trustedBy")}
        </h4>

        <div className="flex flex-wrap justify-center items-center gap-16">
          {[
            { logo: wsm, name: "WSM", url: "https://www.wschupfer.com/new-york?region=row" },
            { logo: image360f, name: "360° Fahrenheit", url: "https://www.3cent60.net/" },
          ].map((partner, idx) => (
            <motion.a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform"
              whileHover={{ scale: 1.1 }}
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, repeatType: "loop", duration: 2.5, ease: "easeInOut" }}
            >
              <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Copyright and Language Selector */}
      <div className="border-t border-gray-200 bg-white/60 py-4 text-sm text-gray-500 relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-center">
          {/* Language selector on the right */}
          <div className="absolute right-6 flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm hover:shadow-md transition duration-200">
            <span className="text-[#f1647c] mr-2" role="img" aria-label="language">
              {t("footer.language.select")}
            </span>
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="bg-transparent text-gray-800 text-sm focus:outline-none cursor-pointer"
              aria-label="Select language"
            >
              <option value="fr">{t("footer.language.fr")}</option>
              <option value="en">{t("footer.language.en")}</option>
            </select>
          </div>

          {/* Centered copyright */}
          <div className="text-center w-full">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </div>
        </div>
      </div>
    </footer>
  );
}