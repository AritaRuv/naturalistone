/* eslint-disable quotes */
import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";
import { productDimensions } from "../../controllers/productDimensions";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const query = `SELECT ProdNameID, Naturali_ProdName, Material    
                  FROM ProdNames
                    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /");
          res.status(404).json("No products");
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

export async function getProductsValuesByProdNameID(req: Request, res: Response) {
  try {

    const prodNameID = req.params.id;
  
    const query = `
      SELECT
        Products.ProdID,
        Products.SalePrice,
        Products.DimensionID,
        Products.ProdNameID,
        ProdNames.Naturali_ProdName,
        Dimension.Finish,
        Dimension.Size,
        Dimension.Thickness
      FROM
        NaturaliStone.Products
      LEFT JOIN
        ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
      LEFT JOIN
        Dimension ON Dimension.DimensionID = Products.DimensionID
      WHERE
        Products.ProdNameID = ?;
    `;
    
    mysqlConnection.query(
      query,
      [prodNameID], (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /:id");
          res.status(404).json("No products");
        } else {
          console.log("Data OK");
          const transformedResults = productDimensions(results)
          res.status(200).json(transformedResults);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
