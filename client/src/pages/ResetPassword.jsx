import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const { email, otp } = location.state || {};

  const [formData, setFormData] = useState({
    email: email,
    otp: otp,
    newPassword: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await resetPassword(formData);
      setStatus("Mot de passe réinitialisé avec succès.");
      setError("");
    } catch (err) {
      setError("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden px-4">
      {/* 🔴 Background pulse */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-700 opacity-30 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
 <Link to="/" className="absolute top-6 left-6 z-50 group" aria-label="Accueil">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 group-hover:text-red-500 font-medium transition-colors">Accueil</span>
        </div>
      </Link>
      <form
        onSubmit={handleReset}
        className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Réinitialiser le mot de passe
        </h2>

        <input
          name="newPassword"
          type="password"
          placeholder="Nouveau mot de passe"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-500"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-500"
        />

        {status && (
          <p className="text-green-600 text-sm text-center">{status}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
