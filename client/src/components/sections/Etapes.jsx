import React, { useEffect, useState } from "react";
import {
  UserCheck,
  MapPin,
  ClipboardList,
  MonitorPlay,
  Repeat,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const steps = [
  { titleKey: "etapes.steps.1.title", icon: UserCheck, descriptionKey: "etapes.steps.1.description" },
  { titleKey: "etapes.steps.2.title", icon: MapPin, descriptionKey: "etapes.steps.2.description" },
  { titleKey: "etapes.steps.3.title", icon: ClipboardList, descriptionKey: "etapes.steps.3.description" },
  { titleKey: "etapes.steps.4.title", icon: MonitorPlay, descriptionKey: "etapes.steps.4.description" },
  { titleKey: "etapes.steps.5.title", icon: Repeat, descriptionKey: "etapes.steps.5.description" },
  { titleKey: "etapes.steps.6.title", icon: Rocket, descriptionKey: "etapes.steps.6.description" },
];

const LigneDeVieHorizontale = () => {
  const { t } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((k) => k + 1);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 md:px-12">
      {/* Titre centré */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {t("etapes.title")} <span className="text-[#ef5d81]">MEMO</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-1xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t("etapes.subtitle")}
        </motion.p>
      </div>

      {/* Timeline horizontale */}
      <div className="flex flex-wrap items-center justify-center">
        <motion.div
          key={`steps-${animationKey}`}
          className="flex items-center space-x-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 1.2,
                staggerChildren: 0.5,
              },
            },
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Étape */}
              <motion.div
                className="flex flex-col items-center text-center min-w-[150px] h-[180px] bg-white p-2 rounded-lg shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.05 }}
              >
                {/* Cercle avec dégradé */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-md mb-4 relative"
                  style={{
                    backgroundImage: "linear-gradient(to bottom right, #ef5d81, #fca07a)",
                    border: "2px solid radient(to bottom right, #ef5d81, #fca07a)",
                    backgroundClip: "padding-box",
                  }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-md font-bold text-[#2d2d2d]">{t(step.titleKey)}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </motion.div>

              {/* Flèche entre étapes */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex items-center justify-center"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.05 }}
                >
                  <ArrowRight
                    className="w-6 h-6"
                    style={{ color: "#ef5d81" }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LigneDeVieHorizontale;
