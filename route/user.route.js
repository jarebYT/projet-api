const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');

// Routes des utilisateurs (/users)
router.get('/:id',userController.getById);

module.exports = router;
