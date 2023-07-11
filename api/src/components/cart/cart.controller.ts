import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";

export async function getCartProducts(req: Request, res: Response) {
    try {
  
      const customerID = req.params.id;
    
      const query = `SELECT * FROM NaturaliStone.Cart
                     LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                     WHERE Cart.CustomerID = ?;
                    `;
      
      mysqlConnection.query(
        query,
        [customerID], (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
          if (error) {
            throw error;
          }
          if (results.length === 0) {
            console.log("Error en cartRoutes.get /:id");
            res.status(404).json("No products in cart");
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