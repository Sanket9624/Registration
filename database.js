const mysql = require('mysql2')
const dotenv = require("./dotenv")

const db = mysql.createConnection({
            host : process.env.HOST,
            database: process.env.DATABASE,
            user:process.env.USER,
            password:process.env.PASSWORD
})
db.connect((err) => {
  if (err) {
      console.log(err);
  }
  console.log('Connected to the database');
});

module.exports = db