import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signup(formData);
      console.log("Signup response:", response);

      if (response.success && !response.user.isAccountVerified) {
        // Navigate to verify page if not yet verified
        navigate(`/verify-account`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Erreur lors de l'inscription. Essayez à nouveau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 px-4 relative overflow-hidden">
      {/* 🔴 Red glowing background */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-600 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* 🧊 Glass card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Créer un compte
        </h2>

        {error && (
          <div className="text-red-500 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded text-sm text-center border border-red-300 dark:border-red-500">
            {error}
          </div>
        )}

        {/* 👤 Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Nom complet
          </label>
          <input
            value={formData.name}
            name="name"
            type="text"
            required
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        {/* 📧 Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Adresse email
          </label>
          <input
            value={formData.email}
            name="email"
            type="email"
            required
            onChange={handleChange}
            placeholder="votre@email.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        {/* 🔒 Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Mot de passe
          </label>
          <input
            value={formData.password}
            name="password"
            type="password"
            required
            onChange={handleChange}
            placeholder="********"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
  );
};

export default Signup;
