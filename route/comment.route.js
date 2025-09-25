const express = require('express');
const router = express.Router();
const commentController = require('./../controller/comment.controller');
const auth = require('../middleware/auth');

// Routes des commentaires (/comments)
router.put('/:id',auth,commentController.update);
router.delete('/:id',auth,commentController.delete);

module.exports = router;
