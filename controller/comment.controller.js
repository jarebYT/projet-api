const comment = require('./../model/comment.model');


exports.getAll = async (req, res) => {
    try {
        let commentList = await Comment.findAll();
        res.status(200).json(commentList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les produits" })
    }
}

exports.getById = async (req, res) => {
    try {
        let comment = await comment.findOne({
            where: {
                id: req.params.id
            }
        });
        comment.picture = "http://localhost:3000/images/" + comment.picture;
        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les comment" })
    }
}

exports.create = async (req, res, next) => {
    try {
        let body = JSON.parse(req.body.comment);
        if(req.file){
            body.picture = req.file.filename
        }
        let comment = await comment.create({
            content : req.body.content,
            user_id : req.body.user_id,
            post_id : req.body.post_id
        });
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json({ error: "Impossible de créer le produit!" })
    }
}

exports.update = async (req, res, next) => {
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if(req.token.id !== product.userId){
            return res.status(403).json('Vous n\'avez pas les droits pour modifier ce produit');
        }
        if(req.body.name){
            product.name = req.body.name;
        }
        if(req.body.description){
            product.description = req.body.description;
        }
        if(req.body.price){
            product.price = req.body.price;
        }
        product.save();
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce produit" })
    }
}

exports.delete = async (req, res) => {
    try {
        let product = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(product);
    } catch (e) {
        res.status(400).json({ error: "Impossible de supprimer ce produit" })
    }
}

