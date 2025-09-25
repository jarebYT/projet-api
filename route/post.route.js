const express = require('express');
const router = express.Router();
const postController = require('./../controller/post.controller');
const commentController = require('./../controller/comment.controller');
const auth = require('../middleware/auth');
const multerMiddleware = require('../middleware/multer.middleware');

router.get('/',postController.getAll);
router.get('/:id',postController.getById);

router.post('/',auth ,postController.create);

router.put('/:id',postController.update);

router.delete('/:id',postController.delete);

// Routes des commentaires (/posts/:id/comments)
router.get('/:id/comments',commentController.getById);
router.post('/:id/comments',auth,multerMiddleware, commentController.create);


module.exports = router;
