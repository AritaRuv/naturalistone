/* eslint-disable quotes */
import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function getAllColors(req: Request, res: Response) {
  try {
    const query = `SELECT ColorID, Color
                    FROM Colors
                    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /");
          res.status(404).json("No colors");
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
