const Product = require('./../model/product.model');


exports.getAll = async (req, res) => {
    try {
        let productList = await Product.findAll();
        res.status(200).json(productList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les produits" })
    }
}

exports.getById = async (req, res) => {
    try {
        let produit = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        produit.picture = "http://localhost:3000/images/" + produit.picture;
        res.status(200).json(produit);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les produits" })
    }
}

exports.create = async (req, res, next) => {
    try {
        let body = JSON.parse(req.body.product);
        if(req.file){
            body.picture = req.file.filename
        }
        let product = await Product.create({
            name: body.name,
            description: body.description,
            price: body.price,
            picture: body.picture
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

