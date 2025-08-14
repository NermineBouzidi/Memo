import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const initialFormState = {
    nom: '',
    prenom: '',
    societe: '',
    fonction: '',
    email: '',
    telephone: '',
    objet: '',
    autreObjet: '',
    collaborateurs: '',
    message: '',
    captcha: false,
    file: null,
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    societe: '',
    fonction: '',
    email: '',
    telephone: '',
    objet: '',
    autreObjet: '',
    collaborateurs: '',
    message: '',
    captcha: '',
    server: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const validateForm = () => {
    const newErrors = {
      nom: '',
      prenom: '',
      societe: '',
      fonction: '',
      email: '',
      telephone: '',
      objet: '',
      autreObjet: '',
      collaborateurs: '',
      message: '',
      captcha: '',
      server: '',
    };
    let isValid = true;

    if (!form.nom) {
      newErrors.nom = 'Le nom est requis.';
      isValid = false;
    }
    if (!form.prenom) {
      newErrors.prenom = 'Le prénom est requis.';
      isValid = false;
    }
    if (!form.societe) {
      newErrors.societe = 'La société est requise.';
      isValid = false;
    }
    if (!form.fonction) {
      newErrors.fonction = 'La fonction est requise.';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = 'L’adresse email est requise.';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Veuillez entrer un email valide.';
      isValid = false;
    }
    if (!form.telephone) {
      newErrors.telephone = 'Le téléphone est requis.';
      isValid = false;
    }
    if (!form.objet) {
      newErrors.objet = 'L’objet de la demande est requis.';
      isValid = false;
    }
    if (form.objet === 'Autre demande' && !form.autreObjet) {
      newErrors.autreObjet = 'Veuillez préciser votre demande.';
      isValid = false;
    }
    if (!form.collaborateurs) {
      newErrors.collaborateurs = 'Le nombre de collaborateurs est requis.';
      isValid = false;
    }
    if (!form.message) {
      newErrors.message = 'Le message est requis.';
      isValid = false;
    }
    if (!form.captcha) {
      newErrors.captcha = 'Veuillez valider le reCAPTCHA.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] || null : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCaptcha = (value) => {
    console.log('reCAPTCHA Token:', value);
    setForm((prev) => ({ ...prev, captcha: value }));
    setErrors((prev) => ({ ...prev, captcha: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de saisie',
        text: 'Veuillez corriger les champs indiqués en rouge.',
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('nom', form.nom);
      formData.append('prenom', form.prenom);
      formData.append('societe', form.societe);
      formData.append('fonction', form.fonction);
      formData.append('email', form.email);
      formData.append('telephone', form.telephone);
      formData.append('objet', form.objet);
      formData.append('autreObjet', form.autreObjet);
      formData.append('collaborateurs', form.collaborateurs);
      formData.append('message', form.message);
      formData.append('captcha', form.captcha);
      if (form.file) {
        formData.append('file', form.file);
      }

      console.log('Sending request to:', import.meta.env.VITE_API_URL || 'http://localhost:8080');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/contact`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setForm(initialFormState);
        setErrors(initialFormState);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); // Reset reCAPTCHA
        }
        Swal.fire({
          icon: 'success',
          title: 'Demande envoyée',
          text: 'Votre demande a été envoyée avec succès vérifier voitre boite mail.',
          position: 'top-end',
          toast: true,
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.error || 'Erreur lors de l’envoi de la demande');
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi du formulaire:', error);
      setErrors((prev) => ({ ...prev, server: error.message }));
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message,
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 px-4 md:px-10 xl:px-28" id="contact">
      <div className="max-w-2xl mx-auto bg-white border rounded-1xl shadow-1xl p-9">
        <div className="text-center mb-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contactez l'équipe <span className="text-[#ef5d81]">MEMO</span>
          </motion.h2>
        </div>

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
            { name: 'nom', label: 'Nom*', placeholder: 'Nom' },
            { name: 'prenom', label: 'Prénom*', placeholder: 'Prénom' },
            { name: 'societe', label: 'Société*', placeholder: 'Société' },
            { name: 'fonction', label: 'Fonction*', placeholder: 'Fonction' },
            { name: 'email', label: 'Email professionnel*', placeholder: 'Email professionnel', type: 'email' },
            { name: 'telephone', label: 'Téléphone*', placeholder: 'Téléphone' },
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
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
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
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">Objet de la demande*</label>
            <select
              name="objet"
              value={form.objet}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.objet ? 'border-red-500' : 'border-gray-300'
              } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
            >
              <option value="">Objet de la demande</option>
              <option>Démo / Présentation</option>
              <option>Assistance / Support</option>
              <option>Devenir partenaire</option>
              <option>Recrutement</option>
              <option>Autre demande</option>
            </select>
            {errors.objet && (
              <motion.p
                className="text-red-500 text-xs mt-1 animate-shake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.objet}
              </motion.p>
            )}
          </motion.div>

          {form.objet === 'Autre demande' && (
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">Précisez votre demande</label>
              <input
                name="autreObjet"
                placeholder="Précisez votre demande"
                value={form.autreObjet}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.autreObjet ? 'border-red-500' : 'border-gray-300'
                } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
              />
              {errors.autreObjet && (
                <motion.p
                  className="text-red-500 text-xs mt-1 animate-shake"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.autreObjet}
                </motion.p>
              )}
            </motion.div>
          )}

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre de collaborateurs</label>
            <select
              name="collaborateurs"
              value={form.collaborateurs}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.collaborateurs ? 'border-red-500' : 'border-gray-300'
              } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
            >
              <option value="">Sélectionnez une plage</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
            {errors.collaborateurs && (
              <motion.p
                className="text-red-500 text-xs mt-1 animate-shake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.collaborateurs}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">Joindre un fichier (optionnel)</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">Votre message*</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Votre message"
              value={form.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
            ></textarea>
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
            transition={{ delay: 1.1, duration: 0.5 }}
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
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 
                       text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-black/50
                       transition"
            >
              {isLoading ? 'Envoi...' : 'Envoyer la demande'}
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
};

export default ContactForm;