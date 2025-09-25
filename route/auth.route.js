const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller');


// Routes d'authentification (/auth)
router.post('/register',authController.signin);
router.post('/login',authController.login);


module.exports = router;
