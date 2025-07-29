import express from "express";
const router = express.Router();

// Exemple de sauvegarde dans ta base
router.post("/create-bank-transfer", async (req, res) => {
  try {
    const { items, paymentMethod, total } = req.body;

    // Générer une référence unique pour le virement
    const reference = `VIR-${Date.now()}`;

    // Sauvegarder dans ta base de données la commande
    // Exemple fictif :
    // await Order.create({ items, paymentMethod, total, reference, status: "pending" });

    console.log("Nouvelle commande virement :", { items, total, reference });

    res.json({
      success: true,
      reference, // renvoyer la référence à afficher au client
    });
  } catch (err) {
    console.error("Erreur backend virement :", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;