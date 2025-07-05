import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo4.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "", server: "" };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "L'adresse email est requise.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      console.log("Login data:", formData);
      const response = await login(formData);
      const role = response.user.role;

      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });

       navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setErrors((prev) => ({
        ...prev,
        server: "Email ou mot de passe incorrect.",
      }));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 px-4 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-600 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 opacity-75 blur-lg animate-spin-slow z-0" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-red-500 opacity-75 blur-lg animate-spin-slow-reverse z-0" />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full space-y-6"
          >
            <Link to="/" className="block">
              <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
            </Link>

            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
              Connexion à votre compte
            </h2>

            {errors.server && (
              <div className="text-red-500 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded text-sm text-center border border-red-300 dark:border-red-500" role="alert">
                {errors.server}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Adresse email
              </label>
              <input
                id="email"
                value={formData.email}
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="votre@email.com"
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                value={formData.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="********"
                className={`w-full px-4 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-red-500"
                />
                Se souvenir de moi
              </label>
              <Link
                to="/forgot-password"
                className="text-pink-500 hover:underline dark:text-pink-300"
              >
                Mot de passe oublié ?
              </Link>
            </div>

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
              Se connecter
            </button>

            <div className="text-center text-sm text-gray-700 dark:text-gray-300">
              Vous n’avez pas de compte ?{" "}
              <Link
                to="/signup"
                className="text-pink-500 dark:text-pink-400 hover:underline font-medium"
              >
                Créez-en un
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style jsx="true" global>{`
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

export default Login;