const Post = require('./../model/post.model');


exports.getAll = async (req, res) => {
    try {
        let postList = await Post.findAll();
        res.status(200).json(postList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les posts" })
    }
}

exports.getById = async (req, res) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        post.picture = "http://localhost:3000/images/" + post.picture;
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer le post" })
    }
}

exports.create = async (req, res, next) => {
    try {
        let body = req.body;
        if(req.file){
            body.picture = req.file.filename
        }
        let post = await Post.create({
            title : req.body.title,
            content : req.body.content,
            image_url : req.body.image_url,
            user_id : req.body.user_id
        });
        res.status(201).json(post);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Impossible de créer le post !" })
    }
}

exports.update = async (req, res, next) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if (req.token.id !== post.user_id) {
            return res.status(403).json({ error: "Vous n'avez pas les droits pour modifier ce post" });
        }
        if(req.body.title){
            post.title = req.body.title;
        }
        if(req.body.content){
            post.content = req.body.content;
        }
        if(req.body.image_url){
            post.image_url = req.body.image_url;
        }
        if(req.body.user_id){
            post.user_Id = req.body.user_id;
        }
        post.save();
        res.status(201).json(post);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Impossible de modifier ce post" })
    }
}

exports.delete = async (req, res) => {
  try {
    let post = await Post.findOne({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.status(404).json({ error: "Post non trouvé" });
    }

    // Vérification : seul le propriétaire peut supprimer
    if (req.token.id !== post.user_id) {
      return res.status(403).json({ error: "Vous n'avez pas les droits pour supprimer ce post" });
    }

    await post.destroy(); // supprime le post
    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Impossible de supprimer ce post" });
  }
};


