import { useCart } from "../contexts/cartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import PayPalButton from "./PayPalButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VoirPanier() {
  const { cartItems, addToCart, removeFromCart, clearCart, handleRemove } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const TND_TO_EUR = 0.3;
  const totalEUR = cartItems.reduce(
    (acc, item) => acc + item.produit.price * item.quantite * TND_TO_EUR,
    0
  );

  const handleCheckout = async () => {
    try {
      const itemsForStripe = cartItems.map((item) => ({
        name: item.produit.name,
        price: item.produit.price,
        quantite: item.quantite,
      }));

      const response = await axios.post(
        "http://localhost:8080/api/stripe/create-checkout-session",
        { items: itemsForStripe },
        { withCredentials: true }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Erreur paiement Stripe :", error);
      alert("Erreur lors du paiement Stripe");
    }
  };

  const onPayPalSuccess = () => {
    clearCart();
    alert("Paiement PayPal réussi. Panier vidé.");
    navigate("/success");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 md:px-20 transition duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-10 text-center text-[#ff1a1a] drop-shadow-[0_0_15px_#ff1a1a]">
        🛒 Votre Panier
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-400">Votre panier est vide.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Product List */}
          <div className="w-full md:w-2/3">
            <p className="text-sm text-gray-500 mb-4">
              Les articles seront réservés pendant 60 minutes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.produit._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-200 bg-[#f5f5f5] dark:bg-[#1a1a1a]"
                  >
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-[#ff1a1a]">
                        {item.produit.name}
                      </h2>
                      <button
                        onClick={() => handleRemove(item.produit._id)}
                        className="text-[#ff1a1a] hover:text-red-400 transition"
                        title="Supprimer"
                      >
                        <Trash2 />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.produit._id)}
                        className="p-2 bg-gray-800 text-white rounded hover:bg-[#ff1a1a]/20 transition"
                        aria-label="Diminuer quantité"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-md font-semibold">{item.quantite}</span>
                      <button
                        onClick={() => addToCart(item.produit)}
                        className="p-2 bg-gray-800 text-white rounded hover:bg-[#ff1a1a]/20 transition"
                        aria-label="Augmenter quantité"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                      Prix unitaire :{" "}
                      <span className="text-[#ff1a1a] font-bold">
                        {(item.produit.price * TND_TO_EUR).toFixed(2)} €
                      </span>
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#ff1a1a] drop-shadow-[0_0_5px_#ff1a1a]">
                      Total : {(item.produit.price * item.quantite * TND_TO_EUR).toFixed(2)} €
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section - Total and Payment */}
          <div className="w-full md:w-1/3 bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#ff1a1a]">TOTAL</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Sous-total</p>
                <p className="text-lg font-semibold text-[#ff1a1a]">
                  {totalEUR.toFixed(2)} €
                </p>
              </div>
           
            </div>
            <motion.button
              onClick={handleCheckout}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255,26,26, 0.7)",
                  "0 0 10px 10px rgba(255,26,26, 0)",
                  "0 0 0 0 rgba(255,26,26, 0.7)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-full bg-[#ff1a1a] hover:bg-red-600 text-white py-3 px-4 rounded-lg mt-6 font-bold"
            >
              PAIEMENT
            </motion.button>
            
            <div
              className={`w-full max-w-md mx-auto p-6 rounded-xl shadow-md mt-6 transition ${
                theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
              }`}
            >
              <h3 className="text-center text-lg font-bold mb-4 text-[#ff1a1a]">
                Payer avec PayPal
              </h3>
              <PayPalButton total={totalEUR} onSuccess={onPayPalSuccess} />
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Vous avez un code promotionnel ? Ajoutez-le à la prochaine étape.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}