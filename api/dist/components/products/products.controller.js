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
              FROM ProdNames
              LEFT JOIN Product_Colors ON Product_Colors.ProdNameID = ProdNames.ProdNameID
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
            const query = `SELECT -- Products.ProdID, Naturali_ProdName, ProdNames.Material, Dimension.*, Quantity 
                  ProdNames.Material, count(*) Sale_count
                  from ProdSold inner join Products on Products.ProdID = ProdSold.ProdID
                  inner join ProdNames on ProdNames.ProdNameID = Products.ProdNameID
                  inner join Dimension on Dimension.DimensionID = Products.DimensionID
                  -- where saleID = 4013
                  group by ProdNames.Material
                  order by count(*) desc
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
                    const materialsFilters = materialesRowData
                        .filter((products) => products.Material !== null)
                        .map((productFilters) => productFilters.Material);
                    res.status(200).json(materialsFilters);
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getAllMaterials = getAllMaterials;
//Ruta para obtener listado de dimensiones de todos los productos filtrados por material ordenados del mas utilizado al menos
function getAllDimensionProperties(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { material } = req.params;
        try {
            const frequencyQuery = `
      SELECT Type AS Value, COUNT(Type) AS Frequency
      FROM Dimension D
      JOIN Products P ON D.DimensionID = P.DimensionID
      JOIN ProdNames PN ON P.ProdNameID = PN.ProdNameID
      WHERE PN.Material = ?
      GROUP BY Type
      ORDER BY Frequency DESC;
    `;
            const properties = ['Type', 'Size', 'Thickness', 'Finish'];
            const dimensionProperties = {};
            for (const property of properties) {
                db_1.default.query(frequencyQuery.replace(/Type/g, property), [material], (error, results) => {
                    if (error) {
                        throw error;
                    }
                    const propertyRowData = results;
                    dimensionProperties[property] = propertyRowData.map(row => row.Value);
                    if (property === 'Finish') {
                        res.status(200).json(dimensionProperties);
                    }
                });
            }
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.getAllDimensionProperties = getAllDimensionProperties;
//Ruta para obtener listado de todos productos filtrados por size, thickness, finish y type
function getProductsFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { material, type, finish, size, thickness } = req.query;
            let query = "SELECT DISTINCT pn.Naturali_ProdName, pn.Material, pn.ProdNameID FROM ProdNames pn INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";
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
            let orClause = "";
            const typeValues = splitValues(type, ",");
            let markerTypes = "";
            typeValues.forEach((elemento, index) => {
                markerTypes += "?";
                if (index < typeValues.length - 1) {
                    markerTypes += ", ";
                }
            });
            if (typeValues.length > 0) {
                orClause +=
                    ` OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Type IN (${markerTypes}))`;
                filters["type"] = typeValues;
            }
            const finishValues = splitValues(finish, ",");
            let markerFinish = "";
            finishValues.forEach((elemento, index) => {
                markerFinish += "?";
                if (index < finishValues.length - 1) {
                    markerFinish += ", ";
                }
            });
            if (finishValues.length > 0) {
                orClause +=
                    ` OR p.dimensionID IN (SELECT DimensionID FROM Dimension WHERE  Dimension.Finish IN (${markerFinish}))`;
                filters["finish"] = finishValues;
            }
            const sizeValues = splitValues(size, ",");
            let markerSize = "";
            sizeValues.forEach((elemento, index) => {
                markerSize += "?";
                if (index < sizeValues.length - 1) {
                    markerSize += ", ";
                }
            });
            if (sizeValues.length > 0) {
                orClause +=
                    ` OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE  Dimension.Size IN (${markerSize}))`;
                filters["size"] = sizeValues;
            }
            const thicknessValues = splitValues(thickness, ",");
            let markerThickness = "";
            thicknessValues.forEach((elemento, index) => {
                markerThickness += "?";
                if (index < thicknessValues.length - 1) {
                    markerThickness += ", ";
                }
            });
            if (thicknessValues.length > 0) {
                orClause +=
                    `OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Thickness IN (${markerThickness}))`;
                filters["thickness"] = thicknessValues;
            }
            if (orClause) {
                whereClause += " AND (" + orClause.slice(4) + ")"; // Removing the leading ' OR '
            }
            if (whereClause) {
                query += " WHERE " + whereClause.slice(5); // Removing the leading ' AND '
            }
            console.log(query);
            const obj = Object.values(filters).flatMap((value) => {
                if (Array.isArray(value)) {
                    return value; // Convert ParsedQs[] to string[]
                }
                else if (typeof value === "string") {
                    return [value]; // Convert the single value to an array with one element
                }
                else {
                    return []; // Return an empty array if the value is undefined or not a string
                }
            });
            console.log(query);
            console.log(obj);
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
            }).flat(Infinity), (error, results) => {
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
            const query = `SELECT ProdNames.Material,
                          ProdNames.Naturali_ProdName, 
                          ProdNames.ProdNameID, 
                          Products.ProdID, 
                          Dimension.Type, 
                          Dimension.Size, 
                          Dimension.Thickness, 
                          Dimension.Finish
                  FROM Products
                  LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                  LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                  ${material ? `WHERE ProdNames.Material = "${material}"` : ``}
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
