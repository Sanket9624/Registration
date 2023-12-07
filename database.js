const mysql = require('mysql2')
const dotenv = require('dotenv')
const result = dotenv.config()
if(result.error){
            throw result.error
}
const db = mysql.createConnection({
            host:process.env.MYSQL_HOST ,
            user:process.env.MYSQL_USER ,  
            database:process.env.MYSQL_DATABASE  ,
            password:process.env.MYSQL_PASSWORD
})
db.connect((err) => {
  if (err) {
      console.log(err);
  }
  console.log('Connected to the database');
});

module.exports = db