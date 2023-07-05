const mysql = require('mysql')
const {MysqlError} = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE
})

connection.connect((err: typeof MysqlError | null) => {
    if (err) console.log(err);
    else console.log('DB is connected');
  });
  

module.exports = connection
