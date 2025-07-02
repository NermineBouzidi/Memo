import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Bar from "../components/Bar";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = "Le nom doit contenir au moins 3 caractères.";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer une adresse email valide.";
    }

    if (
      !formData.password ||
      formData.password.length < 6 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(formData.password)
    ) {
      errors.password =
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validateFields();
  setFieldErrors(errors);

  if (Object.keys(errors).length > 0) {
    Swal.fire({
      icon: "error",
      title: "Erreur de saisie",
      text: "Veuillez corriger les champs indiqués en rouge.",
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return;
  }

  try {
    const response = await signup(formData);

    if (response.success && !response.user.isAccountVerified) {
      Swal.fire({
        icon: "success",
        title: "Inscription réussie",
        text: "Un email de vérification vous a été envoyé.",
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/verify-account");
    } else {
      Swal.fire({
        icon: "success",
        title: "Inscription réussie",
        text: "Bienvenue !",
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/home");
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Erreur d'inscription",
      text: err.message || "Une erreur est survenue lors de l'inscription",
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
};

  return (
    <>
      <Bar />
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 px-4 relative overflow-hidden">
        {/* Animation de fond */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-600 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

        {/* Conteneur du formulaire avec bordure animée */}
        <div className="relative w-full max-w-md">
          {/* Bordure animée - Couche 1 */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 opacity-75 blur-lg animate-spin-slow z-0" />
          
          {/* Bordure animée - Couche 2 (sens inverse) */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-red-500 opacity-75 blur-lg animate-spin-slow-reverse z-0" />
          
          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full space-y-6"
          >
            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
              Créer un compte
            </h2>

            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Nom complet
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className={`w-full px-4 py-3 border ${
                  fieldErrors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition`}
              />
              {fieldErrors.name && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Adresse email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className={`w-full px-4 py-3 border ${
                  fieldErrors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition`}
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className={`w-full px-4 py-3 border ${
                  fieldErrors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition`}
              />
              {fieldErrors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-semibold text-white 
                bg-gradient-to-r from-red-500 to-pink-600 
                shadow-lg shadow-pink-300/40
                hover:from-pink-600 hover:to-red-500 
                hover:scale-105 hover:shadow-xl 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400
                transition-all duration-300 ease-in-out"
            >
              S'inscrire
            </button>

            <div className="text-center text-sm text-gray-700 dark:text-gray-300">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-pink-500 dark:text-pink-400 hover:underline font-medium"
              >
                Connectez-vous
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow-reverse {
          animation: spin-reverse 10s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Signup;