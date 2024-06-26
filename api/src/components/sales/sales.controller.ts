/* eslint-disable quotes */
import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function getSales(req: Request, res: Response) {
  try {
    const query = `SELECT Sales.* FROM Sales`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en salesRoutes.get /invoice/:id");
          res.status(200).json("No invoices linked to this customer");
        } else {
          console.log("Data OK");
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getSalesByProject(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const _query = `SELECT * FROM Sales WHERE ProjectID = ${id}`;

    mysqlConnection.query(
      _query,
      function (err: MysqlError, results: RowDataPacket[]) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "Error in get sales from project" });
        }
        if (results.length === 0) {
          return res
            .status(200)
            .json({ success: true, msg: "No sales for this project" });
        } else {
          return res
            .status(200)
            .json({ success: true, msg: "get data successful", data: results });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "General error", error });
  }
}

export async function getSalesByUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const _query = `SELECT Sales.*, Projects.ProjectName, Projects.Active, Projects.CustomerID
    FROM Sales
    LEFT JOIN Projects ON Sales.ProjectID = Projects.idProjects
    LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
    WHERE Customers.CustomerID = ${id}`;

    mysqlConnection.query(
      _query,
      function (err: MysqlError, results: RowDataPacket[]) {
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
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "General error" });
  }
}

export async function getDetailOfSale(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const _query = `SELECT DISTINCT Sales.* FROM Sales WHERE Naturali_Invoice = ${id}`;

    mysqlConnection.query(
      _query,
      function (err: MysqlError, resultsSales: RowDataPacket) {
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

        mysqlConnection.query(_query2, function (err, resultsPayment) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: "Error in get payments of sale",
              error: err,
            });
          }

          const _query3 = `SELECT ProdSold.ProdID, ProdSold.Quantity, ProdSold.SalePrice, ProdSold.Status,
          ProdNames.Naturali_ProdName, ProdNames.Material, ProdNames.ProdNameID, Dimension.Type, Dimension.Size,
          Dimension.Thickness, Dimension.Finish FROM Products
          LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
          LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
          LEFT JOIN ProdSold ON Products.ProdID = ProdSold.ProdID
          WHERE ProdSold.SaleID = ${id}`;

          mysqlConnection.query(_query3, function (err, resultsProdSold) {
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
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "General error", error });
  }
}

export async function postSales(req: Request, res: Response) {
  try {
    const { naturaliInvoice, value, projectID, invoiceDate, estDelivery_Date, sellerID, shippingMethod, shipTo,
      warehouse_Stamp, payment_Stamp, statusSale, modificationFlag, lastInsertDate, updated_Date, paymentTerms, p_O_No } = req.params;

    const saleValues = [naturaliInvoice, value, projectID, invoiceDate, estDelivery_Date, sellerID, shippingMethod, shipTo, warehouse_Stamp,
      payment_Stamp, statusSale, modificationFlag, lastInsertDate, updated_Date, paymentTerms, p_O_No];

    const queryInsertSale =
      `INSERT INTO Sales(Naturali_Invoice, Value, ProjectID, InvoiceDate,EstDelivery_Date,SellerID,ShippingMethod,ShipTo,Payment_Stamp,
              Status,ModificationFlag,LastInsertDate,Updated_Date,PaymentTerms,P_O_No) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    mysqlConnection.query(
      queryInsertSale,
      saleValues,
      function (err: MysqlError, results: RowDataPacket) {
        if (err) {
          return res.status(400).json({
            success: false,
            msg: "Error in inserting sale",
          });
        }

        return res.status(200).json({
          success: true,
          msg: "Insert sale successful",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "General error in post sale",
    });
  }
}

