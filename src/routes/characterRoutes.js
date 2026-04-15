const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Define a rota que recebe o nome do personagem como parâmetro
router.get('/:nome', characterController.getCharacterByName);

module.exports = router;
