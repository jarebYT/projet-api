const Comment = require('./../model/comment.model');
const Post = require('./../model/post.model');

exports.getById = async (req, res) => {
    try {
        let comment = await Comment.findAll({
            where: {
                post_id: req.params.id
            }
        });
        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les comment" })
    }
}

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        if(req.file){
            body.picture = req.file.filename
        }
        if (!req.token.id) {
            return res.status(403).json({ error: "Vous n'avez pas les droits pour modifier ce post" });
        }
        let comment = await Comment.create({
            content : req.body.content,
            user_id : req.token.id,
            post_id : req.body.post_id
        });
        res.status(201).json(comment);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Impossible d'ajouter le commentaire" })
    }
}

exports.update = async (req, res, next) => {
    try {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        if(req.token.id !== comment.user_id){
            return res.status(403).json('Vous n\'avez pas les droitspour commenter ce post');
        }
        if(req.body.user_id){
            comment.user_id = req.body.user_id;
        }
        if(req.body.content){
            comment.content = req.body.content;
        }
        if(req.body.post_id){
            comment.post_id = req.body.post_id;
        }
        comment.save();
        res.status(201).json(comment);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Impossible de modifier ce commentaire" })
    }
}

exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findOne({
      where: { id: req.params.id }
    });

    if (!comment) {
      return res.status(404).json({ error: "Post non trouvé" });
    }

    // Vérification : seul le propriétaire peut supprimer
    if (req.token.id !== comment.user_id) {
      return res.status(403).json({ error: "Vous n'avez pas les droits pour supprimer ce post" });
    }

    await comment.destroy(); // supprime le post
    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Impossible de supprimer ce post" });
  }
};

