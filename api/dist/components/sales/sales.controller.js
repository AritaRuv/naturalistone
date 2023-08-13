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
exports.getDetailOfSale = exports.getSalesByUser = exports.getSalesByProject = exports.getSales = void 0;
const db_1 = __importDefault(require("../../db"));
function getSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT Sales.* FROM Sales`;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en salesRoutes.get /invoice/:id");
                    res.status(200).json("No invoices linked to this customer");
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
exports.getSales = getSales;
function getSalesByProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const _query = `SELECT * FROM Sales WHERE ProjectID = ${id}`;
            db_1.default.query(_query, function (err, results) {
                if (err) {
                    return res
                        .status(400)
                        .json({ success: false, msg: "Error in get sales from project" });
                }
                if (results.length === 0) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "No sales for this project" });
                }
                else {
                    return res
                        .status(200)
                        .json({ success: true, msg: "get data successful", data: results });
                }
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, msg: "General error", error });
        }
    });
}
exports.getSalesByProject = getSalesByProject;
function getSalesByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const _query = `SELECT Sales.*, Projects.ProjectName, Projects.Active, Projects.CustomerID
    FROM Customers
    LEFT JOIN Projects ON Projects.CustomerID = Customers.CustomerID
    LEFT JOIN Sales ON Sales.ProjectID = Projects.idProjects
    WHERE Customers.CustomerID = ${id}`;
            db_1.default.query(_query, function (err, results) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        msg: "Error in get sales by customer",
                        error: err,
                    });
                }
                if (!results.length) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "sales not found", data: results });
                }
                return res
                    .status(200)
                    .json({ success: true, msg: "Sales data successful", data: results });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, msg: "General error" });
        }
    });
}
exports.getSalesByUser = getSalesByUser;
function getDetailOfSale(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const _query = `SELECT DISTINCT Sales.* FROM Sales WHERE Naturali_Invoice = ${id}`;
            db_1.default.query(_query, function (err, resultsSales) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        msg: "Error in get detail of sale",
                        error: err,
                    });
                }
                if (!resultsSales.length) {
                    return res
                        .status(404)
                        .json({ success: false, msg: "Details of sale not found" });
                }
                const _query2 = `SELECT Payments.idPayments, Payments.InvoiceID, Payments.Amount, Payments.Method, Payments.Date
        FROM Payments
        WHERE InvoiceID = ${id}`;
                db_1.default.query(_query2, function (err, resultsPayment) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            msg: "Error in get payments of sale",
                            error: err,
                        });
                    }
                    const _query3 = `SELECT ProdSold.ProdID, ProdSold.Quantity, ProdSold.SalePrice, ProdSold.Status,
          ProdNames.Naturali_ProdName, ProdNames.Material, ProdNames.ProdNameID FROM Products
          LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
          LEFT JOIN ProdSold ON ProdSold.ProdID = Products.ProdID
          WHERE ProdSold.SaleID = ${id}`;
                    db_1.default.query(_query3, function (err, resultsProdSold) {
                        if (err) {
                            return res
                                .status(400)
                                .json({ success: false, msg: "Error in get prodSolds" });
                        }
                        const details = {
                            sale: resultsSales[0],
                            payments: resultsPayment,
                            prodSolds: resultsProdSold,
                        };
                        return res.status(200).json({
                            success: true,
                            msg: "Details of sale successful",
                            data: details,
                        });
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, msg: "General error", error });
        }
    });
}
exports.getDetailOfSale = getDetailOfSale;
