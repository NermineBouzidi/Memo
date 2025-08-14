import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

export default function DemoPage() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    message: "",
    captcha: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    message: "",
    captcha: "",
    server: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  // Fallback API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      company: "",
      sector: "",
      message: "",
      captcha: "",
      server: "",
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Le nom est requis.";
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "L’adresse email est requise.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis.";
      isValid = false;
    }
    if (!formData.company) {
      newErrors.company = "La société est requise.";
      isValid = false;
    }
    if (!formData.sector) {
      newErrors.sector = "Le secteur d’activité est requis.";
      isValid = false;
    }
    if (!formData.message) {
      newErrors.message = "Le message est requis.";
      isValid = false;
    }
    if (!formData.captcha) {
      newErrors.captcha = "Veuillez valider le reCAPTCHA.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCaptcha = (value) => {
    console.log("reCAPTCHA Token:", value);
    setFormData((prev) => ({ ...prev, captcha: value }));
    setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = validateForm();
  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Erreur de saisie",
      text: "Veuillez corriger les champs indiqués en rouge.",
      position: "top-end",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    });
    return;
  }

  try {
    setIsSubmitting(true);
    
    const response = await fetch(`${API_URL}/api/demo`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'envoi");
    }

    setFormData(initialFormState);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    Swal.fire({
      icon: "success",
      title: "Demande envoyée",
      text: "Votre demande de démo a été envoyée avec succès.",
      position: "top-end",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error("Erreur lors de l'envoi:", err);
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: err.message,
      position: "top-end",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section className="bg-white py-16 px-4 md:px-10 xl:px-28" id="demo">
      <div className="max-w-2xl mx-auto bg-white border rounded-1xl shadow-1xl p-9">
        <motion.h2
          className="text-2xl md:text-2xl font-bold text-gray-900 mb-3 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Testez <span className="text-[#ef5d81]">MEMO</span> gratuitement avec un expert
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-10 max-w-xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Planifiez une démonstration personnalisée selon vos enjeux métier.
        </motion.p>

        {errors.server && (
          <motion.p
            className="text-red-500 text-sm text-center animate-shake"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {errors.server}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Nom & Prénom*",
              name: "name",
              type: "text",
              placeholder: "Nom & Prénom",
            },
            {
              label: "Email professionnel*",
              name: "email",
              type: "email",
              placeholder: "Email",
            },
            {
              label: "Téléphone*",
              name: "phone",
              type: "tel",
              placeholder: "+33 6 00 00 00 00",
            },
            {
              label: "Société*",
              name: "company",
              type: "text",
              placeholder: "Société",
            },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
              />
              {errors[field.name] && (
                <motion.p
                  className="text-red-500 text-xs mt-1 animate-shake"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors[field.name]}
                </motion.p>
              )}
            </motion.div>
          ))}

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Secteur d'activité*
            </label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.sector ? "border-red-500" : "border-gray-300"
              } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
            >
              <option value="">Sélectionner un secteur</option>
              <option>PME de services</option>
              <option>BTP & Architecture</option>
              <option>Agences & Indépendants</option>
              <option>Industrie & Production</option>
              <option>Autre</option>
            </select>
            {errors.sector && (
              <motion.p
                className="text-red-500 text-xs mt-1 animate-shake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.sector}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">Message*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Décrivez brièvement vos besoins ou posez vos questions ici."
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
            />
            {errors.message && (
              <motion.p
                className="text-red-500 text-xs mt-1 animate-shake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="md:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptcha}
            />
            {errors.captcha && (
              <motion.p
                className="text-red-500 text-xs mt-1 animate-shake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.captcha}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="md:col-span-2 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 
                         text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-black/50
                         transition"
            >
              {isSubmitting ? "Envoi..." : "Je planifie ma démo gratuite"}
            </button>
          </motion.div>
        </form>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
          .animate-shake { animation: shake 0.5s ease-in-out; }
        `}</style>
      </div>
    </section>
  );
}