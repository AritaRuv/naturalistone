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
exports.getAllProductsByMaterial = exports.getCheckboxValidation = exports.getProductsFilter = exports.getAllDimensionProperties = exports.getAllMaterials = exports.getProductByIDS = exports.getProductsValuesByProdNameID = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../../db"));
const productDimensions_1 = require("../../controllers/productDimensions");
//import { productDimensionsCheckboxes } from "../../controllers/productDimensionsCheckboxes";
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { material, colorId } = req.query;
            const query = `
              SELECT DISTINCT ProdNames.Material, ProdNames.Naturali_ProdName, ProdNames.ProdNameID,
              Product_Colors.ColorID, Product_Colors.idColorProduct, Product_Colors.ProdNameID
              FROM Product_Colors
              LEFT JOIN ProdNames ON ProdNames.ProdNameID = Product_Colors.ProdNameID
              ${material ? `WHERE Material = "${material}"` : ""}
              ${colorId
                ? `${material ? "AND" : "WHERE"} ColorID = "${colorId}"`
                : ""}
              `;
            db_1.default.query(query, (error, results) => {
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
            db_1.default.query(query, [prodNameID], (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /id/:id");
                    res.status(404).json("No products");
                }
                else {
                    console.log("Data OK");
                    const transformedResults = (0, productDimensions_1.productDimensions)(results);
                    res.status(200).json(transformedResults);
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
            db_1.default.query(query, (error, results) => {
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
//Ruta para obtener listado de todos los nombres de materiales sin repetir
function getAllMaterials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT GROUP_CONCAT(DISTINCT ProdNames.Material SEPARATOR ', ') AS Materials
                    FROM ProdNames;
                    `;
            db_1.default.query(query, (error, results) => {
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
function getAllDimensionProperties(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      SELECT 
        GROUP_CONCAT(DISTINCT Type SEPARATOR ', ') AS Types,
        GROUP_CONCAT(DISTINCT Size SEPARATOR ', ') AS Sizes,
        GROUP_CONCAT(DISTINCT Thickness SEPARATOR ', ') AS Thicknesses,
        GROUP_CONCAT(DISTINCT Finish SEPARATOR ', ') AS Finishes
      FROM Dimension;
    `;
            db_1.default.query(query, (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en getAllDimensionProperties");
                    res.status(404).json("No data");
                }
                else {
                    const propertiesRowData = results[0];
                    const dimensionProperties = {
                        Type: propertiesRowData.Types.split(", ").map((type) => type.trim()),
                        Size: propertiesRowData.Sizes.split(", ").map((size) => size.trim()),
                        Thickness: propertiesRowData.Thicknesses.split(", ").map((thickness) => thickness.trim()),
                        Finish: propertiesRowData.Finishes.split(", ").map((finish) => finish.trim()),
                    };
                    res.status(200).json(dimensionProperties);
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getAllDimensionProperties = getAllDimensionProperties;
function getProductsFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { material, type, finish, size, thickness } = req.query;
            let query = "SELECT DISTINCT pn.Naturali_ProdName, pn.Material, pn.ProdNameID  FROM ProdNames pn";
            let whereClause = "";
            const filters = req.query;
            const splitValues = (value, separator) => {
                if (Array.isArray(value)) {
                    return value;
                }
                return value ? value.split(separator) : [];
            };
            const materialValues = splitValues(material, ",");
            if (materialValues.length > 0) {
                whereClause += " AND pn.Material IN (?)";
                filters["material"] = materialValues;
            }
            const typeValues = splitValues(type, ",");
            if (typeValues.length > 0) {
                query += " INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";
                whereClause +=
                    " AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE type IN (?))";
                filters["type"] = typeValues;
            }
            const finishValues = splitValues(finish, ",");
            if (finishValues.length > 0) {
                query += " INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";
                whereClause +=
                    " AND p.dimensionID IN (SELECT DimensionID FROM Dimension WHERE finish IN (?))";
                filters["finish"] = finishValues;
            }
            const sizeValues = splitValues(size, ",");
            if (sizeValues.length > 0) {
                query += " INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";
                whereClause +=
                    " AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE size IN (?))";
                filters["size"] = sizeValues;
            }
            const thicknessValues = splitValues(thickness, ",");
            if (thicknessValues.length > 0) {
                query += " INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";
                whereClause +=
                    " AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Thickness IN (?))";
                filters["thickness"] = thicknessValues;
            }
            if (whereClause) {
                query += " WHERE " + whereClause.slice(5); // Removing the leading ' AND '
            }
            db_1.default.query(query, Object.values(filters).flatMap((value) => {
                if (Array.isArray(value)) {
                    return value; // Convert ParsedQs[] to string[]
                }
                else if (typeof value === "string") {
                    return [value]; // Convert the single value to an array with one element
                }
                else {
                    return []; // Return an empty array if the value is undefined or not a string
                }
            }), (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error in productsRoutes.get /");
                    res.status(404).json("No products filters");
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
exports.getProductsFilter = getProductsFilter;
function getCheckboxValidation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // //const prodNameID = req.params.id;
            // const finish = req.query.finish?.toString() || ''; // Ensure finish is of type string
            // const thickness = req.query.thickness?.toString() || ''; // Ensure thickness is of type string
            // const size = req.query.size?.toString() || ''; // Ensure size is of type string
            // const query = `
            //   SELECT
            //     Products.ProdID,
            //     Products.SalePrice,
            //     Products.DimensionID,
            //     Products.ProdNameID,
            //     ProdNames.Naturali_ProdName,
            //     Dimension.Finish,
            //     Dimension.Size,
            //     Dimension.Thickness
            //   FROM
            //     NaturaliStone.Products
            //   LEFT JOIN
            //     ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
            //   LEFT JOIN
            //     Dimension ON Dimension.DimensionID = Products.DimensionID
            //   WHERE
            //     Products.ProdNameID = ?;
            // `;
            // mysqlConnection.query(
            //   query,
            //   (error: MysqlError | null, results: RowDataPacket[],) => {
            //     if (error) {
            //       throw error;
            //     }
            //     if (results.length === 0) {
            //       console.log("Error en productsRoutes.get /id/:id");
            //       res.status(404).json("No products");
            //     } else {
            //       console.log("Data OK");
            //       const filteredProducts = productDimensionsCheckboxes(finish, size, thickness, results);
            //       const transformedResults = productDimensions(filteredProducts);
            //       res.status(200).json(transformedResults);
            //     }
            //   }
            // );
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getCheckboxValidation = getCheckboxValidation;
function getAllProductsByMaterial(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { material } = req.query;
            const query = `SELECT ProdNames.Material, ProdNames.Naturali_ProdName, ProdNames.ProdNameID
                  FROM ProdNames
                  ${material ? `WHERE Material = "${material}"` : ``}
                  `;
            db_1.default.query(query, (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en productsRoutes.get /materialfilterby");
                    res.status(404).json(`No products with material ${material}`);
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
exports.getAllProductsByMaterial = getAllProductsByMaterial;
