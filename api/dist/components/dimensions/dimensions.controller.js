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
exports.getDimensions = void 0;
const db_1 = __importDefault(require("../../db"));
function getDimensions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { size, thickness, finish } = req.query;
            const query = `SELECT * From Dimension WHERE Dimension.Size = "${size}" AND Dimension.Thickness = "${thickness}" AND Dimension.Finish = "${finish}"`;
            db_1.default.query(query, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.length === 0) {
                    console.log("Error en ddimensions.get /");
                    res.status(404).json("No dimensions");
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
exports.getDimensions = getDimensions;
// export async function getProductsValuesByProdNameID(req: Request, res: Response) {
//   try {
//     const prodNameID = req.params.id;
//     const query = `
//       SELECT
//         Products.ProdID,
//         Products.SalePrice,
//         Products.DimensionID,
//         Products.ProdNameID,
//         ProdNames.Naturali_ProdName,
//         Dimension.Finish,
//         Dimension.Size,
//         Dimension.Thickness
//       FROM
//         NaturaliStone.Products
//       LEFT JOIN
//         ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
//       LEFT JOIN
//         Dimension ON Dimension.DimensionID = Products.DimensionID
//       WHERE
//         Products.ProdNameID = ?;
//     `;
//     mysqlConnection.query(
//       query,
//       [prodNameID], (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
//         if (error) {
//           throw error;
//         }
//         if (results.length === 0) {
//           console.log("Error en productsRoutes.get /:id");
//           res.status(404).json("No products");
//         } else {
//           console.log("Data OK");
//           const transformedResults = productDimensions(results)
//           res.status(200).json(transformedResults);
//         }
//       }
//     );
//   } catch (error) {
//     res.status(409).send(error);
//   }
// }
