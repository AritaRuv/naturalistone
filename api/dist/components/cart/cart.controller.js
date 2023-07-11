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
exports.getCartProducts = void 0;
const db_1 = __importDefault(require("../../db"));
function getCartProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerID = req.params.id;
            const query = `SELECT * FROM NaturaliStone.Cart
                     LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                     WHERE Cart.CustomerID = ?;
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
