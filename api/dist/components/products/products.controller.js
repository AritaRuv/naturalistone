"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMaterials = exports.getProductByIDS = exports.getProductsValuesByProdNameID = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../../db"));
const productDimensions_1 = require("../../controllers/productDimensions");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { material } = req.query;
            const query = `SELECT ProdNameID, Naturali_ProdName, Material    
                  FROM ProdNames
                  ${material ? `WHERE Material = "${material}"` : ``}
                    `;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /");
                    res.status(404).json("No products");
                }
                else {
                    console.log("Data OK");
                    res.status(200).json(results);
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getAllProducts = getAllProducts;
function getProductsValuesByProdNameID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prodNameID = req.params.id;
            const query = `
      SELECT
        Products.ProdID,
        Products.SalePrice,
        Products.DimensionID,
        Products.ProdNameID,
        ProdNames.Naturali_ProdName,
        Dimension.Finish,
        Dimension.Size,
        Dimension.Thickness
      FROM
        NaturaliStone.Products
      LEFT JOIN
        ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
      LEFT JOIN
        Dimension ON Dimension.DimensionID = Products.DimensionID
      WHERE
        Products.ProdNameID = ?;
    `;
            db_1.default.query(query, [prodNameID], (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /:id");
                    res.status(404).json("No products");
                }
                else {
                    console.log("Data OK");
                    const transformedResults = (0, productDimensions_1.productDimensions)(results);
                    res.status(200).json({ transformedResults });
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getProductsValuesByProdNameID = getProductsValuesByProdNameID;
//Ruta para obtener el productID de la tarjeta en funcion de su DimensionID y de su ProdNameID
function getProductByIDS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ProdNameID, DimensionID } = req.query;
            const query = `SELECT * FROM NaturaliStone.Products where Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID};`;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /IDs");
                    res.status(404).json("No products match this search");
                }
                else {
                    console.log("Data OK");
                    res.status(200).json(results);
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getProductByIDS = getProductByIDS;
function getAllMaterials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT GROUP_CONCAT(DISTINCT ProdNames.Material SEPARATOR ', ') AS Materials
                    FROM ProdNames;
    
                    `;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /material");
                    res.status(404).json("No material");
                }
                else {
                    const materialesRowData = results; // Convertir a tipo RowDataPacket[]
                    const materialesString = materialesRowData.map((row) => row.Materials)[0]; // Obtener la cadena de materiales
                    const materialesArray = materialesString
                        .split(", ")
                        .map((material) => material.trim()); // Dividir la cadena y eliminar los espacios en blanco
                    res.status(200).json(materialesArray);
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getAllMaterials = getAllMaterials;
