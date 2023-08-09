/* eslint-disable quotes */
import { MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function getSales(req: Request, res: Response) {
  try {
    const query = `SELECT Sales.* FROM NaturaliStone.Sales`;

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
