const multer = require("multer");// appelle multer 

const MIME_TYPES = { // détermine les différents types qui peuvent être admis
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
};

const storage = multer.diskStorage({ // détermine la position des fichiers images
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.split(' ').join('_') + Date.now() + "." + MIME_TYPES[file.mimetype]);
    }
});

module.exports = multer({ storage: storage }).single('picture'); // affiche et exporte les images