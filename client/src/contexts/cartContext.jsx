import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Chargement initial du panier
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/panier", {
          withCredentials: true,
        });
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  // Ajouter un produit au panier
  const addToCart = async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/panier/add",
        { produitId: product._id, quantite: 1 },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  // Supprimer UNE unité d'un produit (décrémenter la quantité)
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/panier/decrement`,
        { produitId: productId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCartItems(res.data.items);
    } catch (error) {
      console.error("Erreur lors de la décrémentation du produit :", error);
    }
  };

  // Compteur total d'articles (quantités cumulées)
  const itemCount = cartItems.reduce((total, item) => total + item.quantite, 0);
  const clearCart = async () => {
  try {
    const res = await axios.delete("http://localhost:8080/api/panier/vider", {
      withCredentials: true,
    });
    setCartItems(res.data.items); // vide le panier
  } catch (error) {
    console.error("Erreur lors du vidage du panier :", error);
  }
};

  return (
    <CartContext.Provider
      value={{ cartItems, itemCount, addToCart, removeFromCart,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};



export const useCart = () => useContext(CartContext);
