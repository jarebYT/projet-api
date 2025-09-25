// sync.js
const db = require("./index");

// Importer les modèles pour qu'ils soient enregistrés dans Sequelize
require("./post.model");
require("./user.model");   // si tu as d'autres modèles
require("./comment.model"); // idem

const sync = async () => {
    await db.sync({alter: true}); // ajoute et ou modifie les données sur la table
    console.log("Synchronisation réussie");
}

sync(); // appelle de la fonction de synchronisation
