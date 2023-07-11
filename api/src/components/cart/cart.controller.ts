import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function newCartEntry(req: Request, res: Response) {
  try {
    const { CustomerID, ProductID, Quantity } = req.body;
    
    const query = `INSERT INTO Cart(CustomerID, ProductID, Quantity) VALUES ( ?, ?, ?)`;
    const cartValues = [ CustomerID, ProductID, Quantity];

    mysqlConnection.query(
      query,
      cartValues,
      (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          console.log("Error en cartRoutes.POST: ", error);
          res.status(500).json({ error: error.message });
        } else {
          console.log("Data OK");
          res.status(200).send('New cart entry created');
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

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
