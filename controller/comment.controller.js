// Contrôleur des commentaires
const Comment = require('./../model/comment.model');

// l’URL publique d’une image à partir du nom de fichier.

function buildImageUrl(filename, req) {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/images/${filename}`;
}

// Récupère tous les commentaires.
exports.getAll = async (req, res) => {
  try {
    let commentList = await Comment.findAll();

    // on convertit en JSON brut et on remappe l’URL picture.
    commentList = commentList.map((c) => {
      const data = typeof c.toJSON === 'function' ? c.toJSON() : c;
      if (data.picture) data.picture = buildImageUrl(data.picture, req);
      return data;
    });

    res.status(200).json(commentList);
  } catch (e) {
    res.status(400).json({ error: "Impossible de récupérer les commentaires" });
  }
};


// Récupère un commentaire par identifiant.

exports.getById = async (req, res) => {
  try {
    let c = await Comment.findOne({
      where: { id: req.params.id }
    });

    if (!c) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    c = typeof c.toJSON === 'function' ? c.toJSON() : c;
    if (c.picture) c.picture = buildImageUrl(c.picture, req);

    res.status(200).json(c);
  } catch (e) {
    res.status(400).json({ error: "Impossible de récupérer le commentaire" });
  }
};

//Crée un commentaire.
exports.create = async (req, res, next) => {
  try {
    // On accepte soit req.body.comment (JSON string) soit un body déjà parsé.
    const payload = req.body && req.body.comment
      ? JSON.parse(req.body.comment)
      : req.body || {};

    if (req.file) {
      payload.picture = req.file.filename; // Multer -> filename stocké
    }

    // On crée le commentaire en base. On ne persiste que les champs attendus.
    let c = await Comment.create({
      content: payload.content,
      user_id: payload.user_id,
      post_id: payload.post_id,
      picture: payload.picture || null
    });

    // Retour propre avec URL d’image normalisée
    c = typeof c.toJSON === 'function' ? c.toJSON() : c;
    if (c.picture) c.picture = buildImageUrl(c.picture, req);

    res.status(201).json(c);
  } catch (e) {
    res.status(400).json({ error: "Impossible d'ajouter le commentaire" });
  }
};


//Update commentaire
exports.update = async (req, res, next) => {
  try {
    let c = await Comment.findOne({
      where: { id: req.params.id }
    });

    if (!c) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    // Contrôle d’accès: le propriétaire uniquement
    if (req?.token?.id !== c.user_id) {
      return res.status(403).json({ error: "Vous n'avez pas les droits pour modifier ce commentaire" });
    }

    // Mises à jour partielles
    if (req.body.user_id !== undefined) c.user_id = req.body.user_id;
    if (req.body.content !== undefined) c.content = req.body.content;
    if (req.body.post_id !== undefined) c.post_id = req.body.post_id;

    await c.save();

    let out = typeof c.toJSON === 'function' ? c.toJSON() : c;
    if (out.picture) out.picture = buildImageUrl(out.picture, req);

    res.status(200).json(out);
  } catch (e) {
    res.status(400).json({ error: "Impossible de modifier ce commentaire" });
  }
};

//Supprime un commentaire
exports.delete = async (req, res) => {
  try {
    const deletedCount = await Comment.destroy({
      where: { id: req.params.id }
    });
    // Si aucun commentaire supprimé, on retourne 404
    if (!deletedCount) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    // 200 + payload explicite
    res.status(200).json({ deleted: true });
  } catch (e) {
    res.status(400).json({ error: "Impossible de supprimer ce commentaire" });
  }
};
