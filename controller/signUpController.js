const db = require("../database")

const newUser = (req,res) =>{
const { userName, userPassword, firstName, lastName, MobileNo,confirmPassword} = req.body;
  const insertQuery = 'INSERT INTO userinfo (userName,userPassword,firstName,lastName,MobileNo,confirmPassword ) VALUES (?, ?, ?, ?, ?,?)';
  db.query(insertQuery, [userName, userPassword, firstName, lastName, MobileNo,confirmPassword], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.affectedRows === 1) {
      res.redirect('https://weather-app-ooen.onrender.com/')
    } else {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  });
}

module.exports = {
            newUser
}