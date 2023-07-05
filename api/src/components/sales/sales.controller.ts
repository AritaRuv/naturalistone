/* eslint-disable quotes */
import { MysqlError } from "mysql";
import express, { Request, Response } from "express";
import { Router } from "express";
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
