const express = require('express');
const router = express.Router();
const productController = require('./../controller/product.controller');
const auth = require('../middleware/auth');
const multerMiddleware = require('../middleware/multer.middleware');

router.get('/',productController.getAll);
router.get('/:id',productController.getById);
router.post('/',auth,multerMiddleware, productController.create);
router.put('/:id',auth,productController.update);
router.delete('/:id',auth,productController.delete);

module.exports = router;
