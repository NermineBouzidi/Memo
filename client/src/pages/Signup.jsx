import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import axios from "axios";
import { signupUser } from "../api/auth";

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
    const formData = {
  name: "Dhia",
  email: "dhia@example.com",
  password: "123456"
};

axios.post("http://localhost:8080/api/auth/signup", formData, {
  withCredentials: true // Necessary if credentials are enabled
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error("Signup error:", error);
});
      Swal.fire({
        icon: "success",
        title: "Inscription réussie",
        text: "Votre compte a été créé avec succès!",
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/home");
    } catch (err) {
      console.log(err.message)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      {/* Animation de fond sophistiquée */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 dark:from-red-500/5 dark:to-pink-600/5 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 dark:from-blue-500/5 dark:to-cyan-600/5 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-0" />
      </div>

     {/* Bouton Home flottant - Modifié pour utiliser "/" comme dans la Navbar */}
<Link
  to="/" // Changé de "/home" à "/" pour correspondre à la Navbar
  className="absolute top-6 left-6 z-50 group"
>
  <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        clipRule="evenodd"
      />
    </svg>
    <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 font-medium transition-colors">
      Accueil
    </span>
  </div>
</Link>

      {/* Contenu principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl mx-auto relative z-10 py-16">
        {/* Section Logo - Grande taille */}
        <div className="w-full lg:w-1/2 flex justify-center px-8">
          <div className="max-w-3xl transform transition-all duration-500 hover:scale-[1.01]">
            <div className="flex flex-col items-center space-y-10">
              <div className="relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-pink-200/20 rounded-[40px] blur-2xl animate-pulse-slow" />
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={logo}
                    alt="Logo Entreprise"
                    className="h-56 md:h-72 lg:h-96 w-auto object-contain animate-fade-in"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
              </div>
              
              
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="relative w-full max-w-md">
          {/* Animation de bordure élégante */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-red-500 opacity-20 blur-xl animate-pulse-slow z-0" />
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 opacity-30 blur-lg animate-rotate-slow z-0" />
          
          {/* Conteneur du formulaire */}
          <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
            {/* Barre de dégradé en haut */}
            <div className="h-2 bg-gradient-to-r from-red-500 to-pink-600" />
            
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 space-y-6"
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Créer un compte professionnel
              </h2>

              {/* Champs du formulaire */}
              {[
                {
                  name: "name",
                  label: "Nom complet",
                  type: "text",
                  placeholder: "Jean Dupont",
                  error: fieldErrors.name
                },
                {
                  name: "email",
                  label: "Email professionnel",
                  type: "email",
                  placeholder: "jean.dupont@entreprise.com",
                  error: fieldErrors.email
                },
                {
                  name: "password",
                  label: "Mot de passe sécurisé",
                  type: "password",
                  placeholder: "••••••••",
                  error: fieldErrors.password
                }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 border ${
                        field.error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                      } rounded-lg bg-white dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-red-500 transition duration-300`}
                    />
                    {field.error && (
                      <div className="absolute right-3 top-3.5 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {field.error && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{field.error}</p>
                  )}
                </div>
              ))}

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg font-semibold text-white 
                  bg-gradient-to-r from-red-600 to-pink-600 
                  shadow-lg hover:shadow-xl
                  hover:from-red-700 hover:to-pink-700 
                  transform hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                  transition-all duration-300 ease-out"
              >
                <span className="relative z-10">S'inscrire</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 hover:opacity-100 rounded-lg transition-opacity duration-300" />
              </button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="text-pink-600 dark:text-pink-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                  Connectez-vous
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  @keyframes rotate {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  .animate-float-slow {
    animation: float 12s ease-in-out infinite;
  }
  .animate-float-medium {
    animation: float 8s ease-in-out infinite reverse;
  }
  .animate-rotate-slow {
    animation: rotate 20s linear infinite;
  }
  .animate-pulse-slow {
    animation: pulse 6s ease-in-out infinite;
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`}</style>

    </div>
  );
};

export default Signup;