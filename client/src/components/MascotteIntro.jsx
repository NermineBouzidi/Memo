// MascotteIntro.jsx
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import walkAnimation from "../assets/mascotte-walk.json";

const MascotteIntro = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // durée de l’animation de marche

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Lottie animationData={walkAnimation} className="w-64 h-64" loop={false} />
      <p className="text-xl font-semibold text-pink-600 text-center">
        Bienvenue ! Préparons votre inscription...
      </p>
    </div>
  );
};

export default MascotteIntro;