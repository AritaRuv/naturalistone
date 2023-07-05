"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
    else {
        console.log('Conexión exitosa a la base de datos');
    }
});
const port = 5000; // Puedes cambiar el número de puerto según tus necesidades
app.listen(port, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
