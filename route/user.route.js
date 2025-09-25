const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const auth = require('./../middleware/auth');

<<<<<<< Updated upstream
=======
router.get('/',auth, userController.getAll);

>>>>>>> Stashed changes
router.get('/:id',userController.getById);

module.exports = router;
