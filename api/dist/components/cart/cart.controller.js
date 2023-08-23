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
exports.deleteCartProducts = exports.updateCartProducts = exports.getCartProducts = exports.newCartEntry = void 0;
const db_1 = __importDefault(require("../../db"));
function newCartEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { size, thickness, finish, ProdNameID, quantity, customerID } = req.body;
            db_1.default.beginTransaction((beginTransactionError) => {
                if (beginTransactionError) {
                    console.log("Error al iniciar la transacción: ", beginTransactionError);
                    res.status(500).json({ error: beginTransactionError.message });
                    return;
                }
                if (size !== "") {
                    const queryGetDimension = `SELECT * FROM Dimension WHERE Dimension.Size = "${size}" AND Dimension.Thickness = "${thickness}" AND Dimension.Finish = "${finish}"`;
                    db_1.default.query(queryGetDimension, (dimensionError, dimensionResults, dimensionFields) => {
                        if (dimensionError) {
                            console.log("Error en la consulta queryGetDimension: ", dimensionError);
                            db_1.default.rollback(() => {
                                console.log("Rollback realizado debido a un error en queryGetDimension");
                                res.status(500).json({ error: dimensionError.message });
                            });
                            return;
                        }
                        const dimension = dimensionResults[0];
                        const DimensionID = dimension.DimensionID;
                        const queryGetProdID = `SELECT * FROM NaturaliStone.Products WHERE Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID}`;
                        db_1.default.query(queryGetProdID, (prodError, prodResults, prodFields) => {
                            if (prodError) {
                                console.log("Error en la consulta queryGetProdID: ", prodError);
                                db_1.default.rollback(() => {
                                    console.log("Rollback realizado debido a un error en queryGetProdID");
                                    res.status(500).json({ error: prodError.message });
                                });
                                return;
                            }
                            // Maneja el resultado undefined de la query, en caso de que la convinacion ProdNameID y DimensionID no
                            // exista en la db
                            // ---------------------------------
                            if (prodResults.length === 0) {
                                console.log("El resultado de queryGetProdID es indefinido o vacío.");
                                db_1.default.rollback(() => {
                                    console.log("Rollback realizado debido a un resultado indefinido o vacío en queryGetProdID");
                                    res.status(404).json({ error: "Producto no encontrado" });
                                });
                                return;
                            }
                            //----------------------------------
                            const product = prodResults[0];
                            const productSalePrice = product.SalePrice === null ? 1 : product.SalePrice;
                            const queryInsertCart = "INSERT INTO Cart(CustomerID, ProductID, Quantity, SalePrice) VALUES (?, ?, ?, ?)";
                            const cartValues = [
                                customerID,
                                product.ProdID,
                                0,
                                productSalePrice,
                            ];
                            db_1.default.query(queryInsertCart, cartValues, (insertError, insertResults, insertFields) => {
                                if (insertError) {
                                    console.log("Error en la consulta queryInsertCart: ", insertError);
                                    db_1.default.rollback(() => {
                                        console.log("Rollback realizado debido a un error en queryInsertCart");
                                        res.status(500).json({ error: insertError.message });
                                    });
                                }
                                else {
                                    db_1.default.commit((commitError) => {
                                        if (commitError) {
                                            console.log("Error al realizar el commit: ", commitError);
                                            db_1.default.rollback(() => {
                                                console.log("Rollback realizado debido a un error en el commit");
                                                res
                                                    .status(500)
                                                    .json({ error: commitError.message });
                                            });
                                        }
                                        else {
                                            console.log("Datos OK");
                                            res
                                                .status(200)
                                                .send("Nueva entrada en el carrito creada");
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
                else {
                    const queryGetProdID = `SELECT * FROM NaturaliStone.Products WHERE Products.ProdNameID = ${ProdNameID}`;
                    db_1.default.query(queryGetProdID, (prodError, prodResults, prodFields) => {
                        if (prodError) {
                            console.log("Error en la consulta queryGetProdID: ", prodError);
                            db_1.default.rollback(() => {
                                console.log("Rollback realizado debido a un error en queryGetProdID");
                                res.status(500).json({ error: prodError.message });
                            });
                            return;
                        }
                        // Maneja el resultado undefined de la query, en caso de que la convinacion ProdNameID y DimensionID no
                        // exista en la db
                        // ---------------------------------
                        if (prodResults.length === 0) {
                            console.log("El resultado de queryGetProdID es indefinido o vacío.");
                            db_1.default.rollback(() => {
                                console.log("Rollback realizado debido a un resultado indefinido o vacío en queryGetProdID");
                                res.status(404).json({ error: "Producto no encontrado" });
                            });
                            return;
                        }
                        //----------------------------------
                        const product = prodResults[0];
                        const queryCheckCart = `SELECT ProductID FROM Cart WHERE ProductID = ${product.ProdID}`;
                        db_1.default.query(queryCheckCart, (prodError, prodResults, prodFields) => {
                            if (prodError) {
                                console.log("Error en la consulta queryGetProdID: ", prodError);
                                db_1.default.rollback(() => {
                                    console.log("Rollback realizado debido a un error en queryGetProdID");
                                    res.status(500).json({ error: prodError.message });
                                });
                                return;
                            }
                            if (prodResults.length === 0) {
                                const queryInsertCart = "INSERT INTO Cart(CustomerID, ProductID, Quantity, SalePrice) VALUES (?, ?, ?, ?)";
                                const cartValues = [customerID, product.ProdID, 0, 0];
                                db_1.default.query(queryInsertCart, cartValues, (insertError, insertResults, insertFields) => {
                                    if (insertError) {
                                        console.log("Error en la consulta queryInsertCart: ", insertError);
                                        db_1.default.rollback(() => {
                                            console.log("Rollback realizado debido a un error en queryInsertCart");
                                            res.status(500).json({ error: insertError.message });
                                        });
                                    }
                                    else {
                                        db_1.default.commit((commitError) => {
                                            if (commitError) {
                                                console.log("Error al realizar el commit: ", commitError);
                                                db_1.default.rollback(() => {
                                                    console.log("Rollback realizado debido a un error en el commit");
                                                    res
                                                        .status(500)
                                                        .json({ error: commitError.message });
                                                });
                                            }
                                            else {
                                                console.log("Datos OK");
                                                res
                                                    .status(200)
                                                    .send("Nueva entrada en el carrito creada");
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                res.status(200).send("Ya existe en el carrito");
                            }
                        });
                    });
                }
            });
        }
        catch (error) {
            res.status(409).send(error);
        }
    });
}
exports.newCartEntry = newCartEntry;
function getCartProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerID = req.params.id;
            const query = `SELECT 
                      Cart.idCartEntry,
                      Cart.Quantity,
                      Cart.CustomerID, 
                      Products.SalePrice,
                      Dimension.Type,
                      Dimension.Size,
                      Dimension.Thickness,
                      Dimension.Finish,
                      ProdNames.Naturali_ProdName,
                      ProdNames.Material
                    FROM NaturaliStone.Cart
                    LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                    LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                    LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                    WHERE Cart.CustomerID = ${customerID};
                    `;
            db_1.default.query(query, [customerID], (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en cartRoutes.get /:id");
                    res.status(404).json("No products in cart");
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
exports.getCartProducts = getCartProducts;
function updateCartProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Quantity, idCartEntry } = req.body;
            const query = `UPDATE NaturaliStone.Cart SET Quantity = ${Quantity} WHERE idCartEntry = ${idCartEntry}`;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log(`Error en cart.update cartEntry: ${idCartEntry}`);
                    res
                        .status(404)
                        .json(`Error en cart.update cartEntry: ${idCartEntry}`);
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
exports.updateCartProducts = updateCartProducts;
function deleteCartProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idCartEntry } = req.params;
            const query = `DELETE FROM Cart WHERE  idCartEntry = ${idCartEntry}`;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    res.status(200).json(`Error deleting cartEntry: ${idCartEntry}`);
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
exports.deleteCartProducts = deleteCartProducts;
