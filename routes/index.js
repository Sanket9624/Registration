const express = require('express');
const signinController = require('../controller/signinController.js');
const signUpController = require('../controller/signUpController');
const router = express.Router();

router.post('/signin', signinController.registerUser);
router.post('/', signUpController.newUser);


module.exports = router;
