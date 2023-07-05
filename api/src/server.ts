import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mysql from "mysql2";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import "./db";
import mainRouter from "./components/index";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://main.d2z2dpapj7iyfx.amplifyapp.com/"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(mainRouter);

const port = 5000; // Puedes cambiar el número de puerto según tus necesidades
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});

// Error catching middleware.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
