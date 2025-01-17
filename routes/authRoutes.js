let express = require('express');
let router = express.Router();
let authController = require('../controllers/authController');

router.post('/login', authController.login); 

module.exports = router;