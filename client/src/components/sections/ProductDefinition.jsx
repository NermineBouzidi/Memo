import React from 'react';
import logo from '../../assets/logo9.png'; // Adjust path if needed
import { Target } from 'lucide-react';
import { useTranslation } from "react-i18next";

const ProductDefinition = () => {
    const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div>
            <div className="flex items-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mr-4">
                    <Target className="text-[#ff625a] " size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("hero.productDetails.title")}</h2>
                </div>
            <p className="text-lg text-gray-600 mb-4">
                                {t("hero.productDetails.description")}

            </p>
            <p className="text-lg text-gray-600 mb-4">
                                {t("hero.productDetails.features")}

            </p>
            
          </div>

          {/* Logo Section */}
          <div className="flex justify-center">
            <div className="relative p-8 rounded-3xl  bg-white/60 backdrop-blur-lg border border-white/30">
              {/* Glow background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#ff4e50] via-[#ff7a5c] to-transparent opacity-20 blur-3xl rounded-3xl" />
              {/* Actual logo */}
              <img
                src={logo}
                alt="Logo du produit"
                className="w-auto max-w-[450px] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDefinition;
