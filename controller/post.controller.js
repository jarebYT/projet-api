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
        let body = JSON.parse(req.body.post);
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
        if(req.token.id !== post.user_Id){
            return res.status(403).json('Vous n\'avez pas les droits pour modifier ce produit');
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
        if(req.body.user_Id){
            post.user_Id = req.body.user_Id;
        }
        post.save();
        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce post" })
    }
}

exports.delete = async (req, res) => {
    try {
        let post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de supprimer ce post" })
    }
}

