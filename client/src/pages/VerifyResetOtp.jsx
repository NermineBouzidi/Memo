import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    // If user pasted full 6-digit code
    if (value.length === 6) {
      const valueArray = value.split("").slice(0, 6);
      setOtp(valueArray);
      valueArray.forEach((v, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = v;
        }
      });
      inputRefs.current[5]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const pasteArray = paste.split("");
      setOtp(pasteArray);
      pasteArray.forEach((v, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = v;
        }
      });
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    try {
      navigate("/reset-password", {
        state: { email: location.state.email, otp: code },
      });
    } catch (err) {
      setError("Code invalide ou expiré.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 relative overflow-hidden px-4">
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-700 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          Vérification du compte
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Entrez le code à 6 chiffres envoyé à votre adresse e-mail
        </p>

        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Vérifier
        </button>
      </form>
    </div>
  );
};

export default VerifyResetOtp;
