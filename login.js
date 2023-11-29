const express = require('express')
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const mysql =require('mysql2')
const path = require('path')
const bodyParser = require('body-parser');
const { error } = require('console');
const app = express()

const db = mysql.createConnection({
            host:process.env.MYSQL_HOST,
            user:process.env.MYSQL_USER,  
            database:process.env.MYSQL_DATABASE ,
            password:process.env.MYSQL_PASSWORD
})
db.connect((err) => {
  if (err) {
      console.log(error);;
  }
  console.log('Connected to the database');
});

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
        console.error(error);
          return res.status(500).send('Error in database');
      }
      if (results.length > 0) {
        // Authentication successful - user found in the database
        // Reset the email field after successful login
        const script = '<script>document.getElementById("e-mail").value = " ";</script>';
        res.redirect('https://easy-blue-hippo-boot.cyclic.app/')// Send the script along with the response
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
      res.redirect('https://easy-blue-hippo-boot.cyclic.app/')} else {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  });
});
       
port = process.env.PORT

app.listen(port ,() =>{
            console.log(`Port is running on ${port}`);
})