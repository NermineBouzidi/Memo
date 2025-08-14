import React from 'react';
import { Brush, Shield, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const pricing = [
  {
    title: "pricing.pack1.title",
    features: [
      "pricing.pack1.feature1",
      "pricing.pack1.feature2",
      "pricing.pack1.feature3", // Use the translation key; format later
      "pricing.pack1.feature4"
    ],
    footer: "pricing.pack1.footer",
    icon: <Brush size={20} stroke="white" />,
  },
  {
    title: "pricing.pack2.title",
    features: [
      "pricing.pack2.feature1",
      "pricing.pack2.feature2",
      "pricing.pack2.feature3" // Use the translation key; format later
    ],
    footer: "pricing.pack2.footer",
    icon: <Shield size={20} stroke="white" />,
  },
  {
    title: "pricing.pack3.title",
    features: [
      "pricing.pack3.feature1",
      "pricing.pack3.feature2",
      "pricing.pack3.feature3"
    ],
    footer: "pricing.pack3.footer",
    icon: <Wrench size={20} stroke="white" />,
  },
];

const Tarifs = () => {
  const { t } = useTranslation();

  // Function to format features with line breaks where needed
  const formatFeature = (featureKey) => {
    if (featureKey === "pricing.pack1.feature3") {
      const text = t(featureKey);
      const parts = text.split("à");
      return (
        <>
          {parts[0]}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{parts[1]?.trim()}
        </>
      );
    } else if (featureKey === "pricing.pack2.feature3") {
      const text = t(featureKey);
      const parts = text.split("sans");
      return (
        <>
          {parts[0]}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{parts[1]?.trim()}
        </>
      );
    }
    return t(featureKey);
  };

  return (
    <section className="bg-white py-16 px-4 md:px-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t("pricing.title")}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
          {t("pricing.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {pricing.map((pack, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-all h-50"
          >
            <div className="flex flex-col">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef5d81] to-[#fca07a] flex items-center justify-center mb-2">
                  {pack.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {t(pack.title)}
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 mb-4 pl-4">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">{formatFeature(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-700 text-sm font-medium text-center mt-auto pt-4">{t(pack.footer)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tarifs;