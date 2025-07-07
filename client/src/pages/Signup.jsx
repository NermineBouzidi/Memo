// Signup.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import axios from "axios";
import { signupUser } from "../api/auth";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import MascotteIntro from "../components/MascotteIntro";

const Signup = () => {
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [enableGoogleLogin, setEnableGoogleLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showForm) setEnableGoogleLogin(true);
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
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
      errors.password = "Mot de passe trop faible.";
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
        text: "Corrigez les champs indiqués.",
        position: "top-end",
        toast: true,
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      await signupUser(formData);
      Swal.fire({
        icon: "success",
        title: "Inscription réussie",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.message || "Erreur lors de l'inscription",
        toast: true,
        timer: 3000,
        position: "top-end",
        showConfirmButton: false,
      });
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
      const res = await axios.post("http://localhost:8080/api/auth/register/google", googleUserData, {
        withCredentials: true,
      });
      if (res.data) {
        await login({ email: res.data.newUser.email, password: res.data.finalPassword });
        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          toast: true,
          timer: 2000,
          position: "top-end",
          showConfirmButton: false,
        });
        navigate("/home");
      }
    } catch (err) {
      console.error("Erreur Google Login :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = () => console.error("Google login failed");

  useGoogleOneTapLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
    disabled: !enableGoogleLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 relative overflow-hidden">
      {/* Mascotte avant le formulaire */}
      {!showForm ? (
        <MascotteIntro onFinish={() => setShowForm(true)} />
      ) : (
        <>
          {/* Fond animé */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-full blur-3xl animate-float-slow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl animate-float-medium top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 z-0" />
          </div>

          {/* Logo */}
          <div className="w-full lg:w-1/2 flex justify-center px-8">
            <img src={logo} alt="Logo" className="h-72 animate-fade-in" />
          </div>

          {/* Formulaire */}
          <div className="relative w-full max-w-md z-10">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 opacity-30 blur-xl animate-rotate-slow" />
            <form onSubmit={handleSubmit} className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border rounded-2xl shadow-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Créer un compte
              </h2>

              {["name", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {field === "name" ? "Nom complet" : field === "email" ? "Adresse Email" : "Mot de passe"}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    placeholder={
                      field === "name" ? "Jean Dupont" : field === "email" ? "exemple@mail.com" : "••••••••"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  />
                  {fieldErrors[field] && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{fieldErrors[field]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition duration-300"
              >
                {isLoading ? "Traitement..." : "S'inscrire"}
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
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="text-pink-500 hover:underline">
                  Connectez-vous
                </Link>
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
