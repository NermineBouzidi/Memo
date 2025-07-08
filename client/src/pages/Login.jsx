import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo4.png";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enableGoogleLogin, setEnableGoogleLogin] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez corriger les champs indiqués.",
        toast: true,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await login(formData);
      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        toast: true,
        timer: 2000,
        position: "top-end",
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setErrors({ server: "Email ou mot de passe incorrect." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(response.credential);
      const googleUserData = {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
      };

      const res = await axios.post("http://localhost:8080/api/auth/login/google", googleUserData, {
        withCredentials: true,
      });

      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        toast: true,
        timer: 2000,
        position: "top-end",
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google login failed");
  };

  useGoogleOneTapLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
    disabled: !enableGoogleLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      {/* Fond animé */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="relative w-full max-w-md z-10">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 opacity-30 blur-xl animate-rotate-slow" />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <Link to="/" className="block">
            <img src={logo} alt="Logo" className="h-12 mx-auto mb-4 animate-fade-in" />
          </Link>

          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Connexion</h2>

          {errors.server && (
            <p className="text-red-500 text-sm bg-red-100 dark:bg-red-900/20 p-2 rounded text-center border border-red-300 dark:border-red-500 animate-shake">
              {errors.server}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 animate-shake">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 animate-shake">{errors.password}</p>}
          </div>

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
            <Link to="/forgot-password" className="text-pink-500 hover:underline dark:text-pink-300">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition duration-300"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="text-center">
            <img
              src="/assets/icons/google.png"
              alt="Google"
              width="24"
              height="24"
              onClick={() => setEnableGoogleLogin(true)}
              className="mx-auto cursor-pointer"
            />
          </div>

          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            Vous n’avez pas de compte ?{" "}
            <Link to="/signup" className="text-pink-500 hover:underline">
              Créez-en un
            </Link>
          </p>
        </form>
      </div>

      <style jsx="true" global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes rotate { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-float-slow { animation: float 12s ease-in-out infinite; }
        .animate-float-medium { animation: float 8s ease-in-out infinite reverse; }
        .animate-rotate-slow { animation: rotate 20s linear infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
