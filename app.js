const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const signinController = require('./controller/signinController');
const signUpController = require('./controller/signUpController');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your index.html)
app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname, 'sign_in')));
app.use('/sign_in', express.static(path.join(__dirname, 'sign_in')));
app.use('/sign_up', express.static(path.join(__dirname, 'sign_up')));
app.use('/Log_in/sign_up', express.static(path.join(__dirname, 'sign_up')));
app.use('/Log_in/sign_in', express.static(path.join(__dirname, 'sign_in')));

app.post("/register",signinController.registerUser)
app.post('/signup', signUpController.newUser);

module.exports = app