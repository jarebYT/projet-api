const express = require('express');
const router = express.Router();
const commentController = require('./../controller/comment.controller');
const auth = require('../middleware/auth');
const multerMiddleware = require('../middleware/multer.middleware');

router.put('/:id',auth,commentController.update);
router.delete('/:id',auth,commentController.delete);

module.exports = router;
