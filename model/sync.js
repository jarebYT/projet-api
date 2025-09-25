// sync.js
const db = require("./index");

// Importer les modèles pour qu'ils soient enregistrés dans Sequelize
require("./post.model");
require("./user.model");   // si tu as d'autres modèles
require("./comment.model"); // idem

const sync = async () => {
  try {
    await db.sync({ alter: true }); // crée ou met à jour les tables
    console.log("✅ Synchronisation réussie");
  } catch (err) {
    console.error("❌ Erreur de synchronisation :", err);
  }
};

sync();
