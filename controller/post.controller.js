// Contrôleur des posts
const Post = require('./../model/post.model');

// Fonction utilitaire pour normaliser l’URL d’image
function normalizeImageUrl(imageUrl, req) {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${req.protocol}://${req.get('host')}/images/${imageUrl}`;
}

// Récupère tous les posts.
exports.getAll = async (req, res) => {
  try {
    let postList = await Post.findAll();
    // on convertit en JSON brut et on remappe l’URL image_url.
    postList = postList.map((p) => {
      const data = typeof p.toJSON === 'function' ? p.toJSON() : p;
      if (data.image_url) data.image_url = normalizeImageUrl(data.image_url, req);
      return data;
    });

    res.status(200).json(postList);
  } catch (e) {
    res.status(400).json({ error: "Impossible de récupérer les posts" });
  }
};

// Récupère un post par identifiant.
exports.getById = async (req, res) => {
  try {
    let p = await Post.findOne({
      where: { id: req.params.id }
    });

    if (!p) {
      return res.status(404).json({ error: "Post introuvable" });
    }

    p = typeof p.toJSON === 'function' ? p.toJSON() : p;
    if (p.image_url) p.image_url = normalizeImageUrl(p.image_url, req);

    res.status(200).json(p);
  } catch (e) {
    res.status(400).json({ error: "Impossible de récupérer le post" });
  }
};

// Crée un post.
exports.create = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image_url = req.file.filename; 
    }

    let p = await Post.create({
      title: payload.title,
      content: payload.content,
      image_url: payload.image_url || null,
      user_id: payload.user_id
    });

    p = typeof p.toJSON === 'function' ? p.toJSON() : p;
    if (p.image_url) p.image_url = normalizeImageUrl(p.image_url, req);

    res.status(201).json(p);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Impossible de créer le post !" });
  }
};

// Met à jour un post.
exports.update = async (req, res, next) => {
  try {
    let p = await Post.findOne({
      where: { id: req.params.id }
    });

    if (!p) {
      return res.status(404).json({ error: "Post introuvable" });
    }

    // Contrôle d’accès: propriétaire uniquement
    if (req?.token?.id !== p.user_id) {
      return res.status(403).json({ error: "Vous n'avez pas les droits pour modifier ce post" });
    }

    // Mises à jour partielles (on ne met à jour que les champs envoyés)
    if (req.body.title !== undefined) p.title = req.body.title;
    if (req.body.content !== undefined) p.content = req.body.content;
    if (req.body.image_url !== undefined) p.image_url = req.body.image_url;
    if (req.body.user_id !== undefined) p.user_id = req.body.user_id; // à éviter en pratique

    await p.save(); 

    let out = typeof p.toJSON === 'function' ? p.toJSON() : p;
    if (out.image_url) out.image_url = normalizeImageUrl(out.image_url, req);

    res.status(200).json(out);
  } catch (e) {
    res.status(400).json({ error: "Impossible de modifier ce post" });
  }
};

// Supprime un post.
exports.delete = async (req, res) => {
  try {
    const deletedCount = await Post.destroy({
      where: { id: req.params.id }
    });

    if (!deletedCount) {
      return res.status(404).json({ error: "Post introuvable" });
    }

    // 200 + payload explicite (on pourrait aussi faire 204 No Content)
    res.status(200).json({ deleted: true });
  } catch (e) {
    res.status(400).json({ error: "Impossible de supprimer ce post" });
  }
};
