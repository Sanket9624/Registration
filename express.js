const express = require('express')
const app = express()
const db = require('./database.js')
const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// Serve static files (e.g., your index.html)

app.use(express.static('public'));


app.use('/', express.static(path.join(__dirname, 'sign_in')));
app.use('/sign_in', express.static(path.join(__dirname, 'sign_in')));
app.use('/sign_up', express.static(path.join(__dirname, 'sign_up')));
app.use('/Log_in/sign_up', express.static(path.join(__dirname, 'sign_up')));
app.use('/Log_in/sign_in', express.static(path.join(__dirname, 'sign_in')));

app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'sign_in', 'index.html'));
          });
// Serve sign-in index.html on '/sign_in'
app.get('/sign_in', (req, res) => {
            res.sendFile(path.join(__dirname, 'sign_in', 'index.html'));
          });
// Serve sign-up index.html on '/Log_in/sign_up'
app.get('/Log_in/sign_up', (req, res) => {
            res.sendFile(path.join(__dirname, 'sign_up', 'index.html'));
          });
app.get('/Log_in/sign_in', (req, res) => {
            res.sendFile(path.join(__dirname, 'sign_up', 'index.html'));
          });
app.get('/sign_up', (req, res) => {
            res.sendFile(path.join(__dirname, 'sign_up', 'index.html'));
          });
// login page
// Handle POST request to '/login' endpoint
app.post('/register', (req, res) => {
  const { user_name, Mobile_No, user_password } = req.body;
  // Perform user authentication/query in the database
  const sql = 'SELECT * FROM loginuserinfo WHERE  (user_name = ? OR Mobile_No = ?) AND user_password = ?';
  db.query(sql, [user_name , user_name, user_password], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        // Authentication successful - user found in the database
        res.redirect('https://weather-app-ooen.onrender.com') // Send the script along with the response
    } else {
          // Authentication failed - user not found or invalid credentials
          return res.status(401).send('User not found');
      }
  });
});
//Sign up
app.post('/signup', (req, res) => {
  const { user_name, user_password, firstName, lastName, Mobile_No , confirm_Password } = req.body;
  const insertQuery = 'INSERT INTO loginuserinfo (user_name,user_password,firstName,lastName,Mobile_No , confirm_Password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [user_name, user_password, firstName, lastName, Mobile_No, confirm_Password], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.affectedRows === 1) {
      res.redirect('https://weather-app-ooen.onrender.com/')} else {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  });
});
const port = process.env.PORT
app.listen(port,()=>{
  console.log(`App is running on http://localhost:${port}`);
})