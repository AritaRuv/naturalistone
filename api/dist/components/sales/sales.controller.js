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
exports.getSalesByProject = exports.getSales = void 0;
const db_1 = __importDefault(require("../../db"));
function getSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT Sales.* FROM NaturaliStone.Sales`;
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
