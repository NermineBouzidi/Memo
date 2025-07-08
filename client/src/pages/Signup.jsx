import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import axios from "axios";
import { signupUser } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import MascotteIntro from "../components/MascotteIntro";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.name || formData.name.trim().length < 3)
      errors.name = "Le nom doit contenir au moins 3 caractères.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Veuillez entrer une adresse email valide.";
    if (
      !formData.password ||
      formData.password.length < 6 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(formData.password)
    )
      errors.password =
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
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
        text: "Veuillez corriger les champs indiqués.",
        position: "top-end",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await signupUser(formData);
      if (!response.data.user.isAccountVerified) {
        Swal.fire({
          icon: "success",
          title: "Inscription réussie",
          text: "Un email de vérification vous a été envoyé.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/verify-account");
      } else {
        await login(response.data.user, response.data.token);
        Swal.fire({
          icon: "success",
          title: "Bienvenue !",
          toast: true,
          timer: 3000,
          position: "top-end",
          showConfirmButton: false,
        });
        navigate("/home");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de l'inscription";
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: message,
        toast: true,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
  setGoogleLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/google", // Nouvelle URL
      { credential: credentialResponse.credential },
      { withCredentials: true }
    );

    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Authentification réussie",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/");
    }
  } catch (error) {
    console.error("Google auth error:", error);
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: error.response?.data?.message || "Échec de l'authentification Google",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
  } finally {
    setGoogleLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      <Link to="/" className="absolute top-6 left-6 z-50 group" aria-label="Accueil">
        <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border hover:bg-white dark:hover:bg-gray-700 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 font-medium">Accueil</span>
        </div>
      </Link>

      {!showForm ? (
        <MascotteIntro onFinish={() => setShowForm(true)} />
      ) : (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-0" />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center px-8">
            <img src={logo} alt="Logo" className="h-72 animate-fade-in" />
          </div>

          <div className="relative w-full max-w-md z-10">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 opacity-30 blur-xl animate-rotate-slow" />
            <form onSubmit={handleSubmit} className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border rounded-2xl shadow-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Créer un compte</h2>

              {["name", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {field === "name" ? "Nom complet" : field === "email" ? "Adresse Email" : "Mot de passe"}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    placeholder={field === "name" ? "Jean Dupont" : field === "email" ? "exemple@mail.com" : "••••••••"}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${fieldErrors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  />
                  {fieldErrors[field] && <p className="text-red-500 text-xs mt-1 animate-shake">{fieldErrors[field]}</p>}
                </div>
              ))}

              <button 
                type="submit" 
                disabled={isLoading || googleLoading}
                className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition duration-300 disabled:opacity-70"
              >
                {isLoading ? "Traitement..." : "S'inscrire"}
              </button>

              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow"></div>
                <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">ou</span>
                <div className="border-t border-gray-300 dark:border-gray-600 flex-grow"></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => {
                    Swal.fire({
                      icon: "error",
                      title: "Erreur",
                      text: "Échec de l'authentification Google",
                      toast: true,
                      position: "top-end",
                      timer: 3000,
                      showConfirmButton: false,
                    });
                  }}
                  shape="pill"
                  theme="filled_blue"
                  size="large"
                  text="signup_with"
                  locale="fr"
                  useOneTap={false}
                  disabled={googleLoading || isLoading}
                />
              </div>

              <p className="text-sm text-center text-gray-700 dark:text-gray-300">
                Vous avez déjà un compte ? <Link to="/login" className="text-pink-500 hover:underline">Connectez-vous</Link>
              </p>
            </form>
          </div>
        </>
      )}

      <style>{`
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

export default Signup;