/* eslint-disable quotes */
import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function getAllColors(req: Request, res: Response) {
  try {
    const query = `SELECT ColorName 
                    FROM Colors
                    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en colorsRoutes.get /");
          res.status(404).json("No colors");
        } else {
          console.log("Colors OK");
          const colorNames = results.map((row) => row.ColorName);
          res.status(200).json(colorNames);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
