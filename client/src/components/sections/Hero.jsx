export default function Hero(){
    return (
<section   id="accueil" className="min-h-screen flex flex-col justify-center items-center bg-black px-4 text-center -mt-12">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Bienvenue sur PEGASIO
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mb-10">
        La plateforme intelligente pour gérer vos projets efficacement.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition">
          Commencer
        </button>
        <button className="bg-white border border-red-600 text-red-600 px-6 py-3 rounded-full hover:bg-red-50 transition">
          En savoir plus
        </button>
      </div>
    </section>
  );

}