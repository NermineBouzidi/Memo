import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import demoVideo from "../../assets/Demo.mp4";
import previewImg from "../../assets/DemoPreview.jpg";

const video = {
  title: "videoDemo.title",
  subtitle: "videoDemo.subtitle",
  cta: "videoDemo.cta",
  alt: "videoDemo.alt",
  resume: "videoDemo.resume",
  banner: "videoDemo.banner",
  close: "videoDemo.modal.close",
};

export default function VideoDemo() {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 md:px-0 bg-white border-t border-gray-200" id="demo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Texte à gauche */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-[2.3rem] md:text-[2.5rem] font-semibold text-[#1a1a1a] mb-4 leading-tight">
            {t(video.title)}
          </h2>
          <p className="text-lg md:text-xl text-[#4a4a4a] mb-7 max-w-xl">
            {t(video.subtitle)}
          </p>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setShowVideo(true)}
              className="bg-gradient-to-r from-pink-500 to-orange-400 transition shadow-lg text-white text-base font-semibold rounded-xl px-6 py-2 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#f25287]/40"
              aria-label={t(video.alt)}
            >
              <PlayCircle size={22} className="mr-1" />
              {t(video.cta)}
            </button>
            {/* Infobulle résumé vidéo */}
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              tabIndex={0}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              <Info size={20} className="text-[#f25287] cursor-pointer" />
              {showTooltip && (
                <div className="absolute left-8 top-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-700 w-72">
                  {t(video.resume)}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        {/* Visuel vidéo à droite */}
        <motion.div
          className="flex-1 w-full max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            {/* Image de prévisualisation */}
            <img
              src={previewImg}
              alt={t(video.alt)}
              className="w-full h-64 md:h-80 object-cover"
              onClick={() => setShowVideo(true)}
              style={{ display: showVideo ? "none" : "block" }}
            />
            {/* Surcouche foncée */}
            <div
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
              onClick={() => setShowVideo(true)}
              style={{ pointerEvents: showVideo ? "none" : "auto" }}
            >
              {/* Bouton Play central */}
              <button
                className="bg-gradient-to-r from-pink-500 to-orange-400 transition shadow-xl rounded-full w-20 h-20 flex items-center justify-center"
                aria-label={t(video.alt)}
                tabIndex={-1}
              >
                <PlayCircle size={48} className="text-white" />
              </button>
            </div>
            {/* Bandeau texte */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-3">
              <span className="text-white text-base md:text-lg font-semibold drop-shadow">{t(video.banner)}</span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Modal Video Player */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black p-1 z-10"
              aria-label={t(video.close)}
            >
              <X size={28} />
            </button>
            <video
              controls
              className="w-full h-[320px] md:h-[500px] bg-black"
              src={demoVideo}
              preload="metadata"
              playsInline
              autoFocus
            ></video>
          </div>
        </div>
      )}
    </section>
  );
}