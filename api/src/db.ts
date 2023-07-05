import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import mysql from "mysql";
import MysqlError from "mysql";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE,
});

connection.connect((err: typeof MysqlError | null) => {
  if (err) console.log(err);
  else console.log("DB is connected");
});

export default connection;
