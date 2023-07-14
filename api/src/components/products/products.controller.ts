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
          res.status(200).json({transformedResults});
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
//Ruta para obtener el productID de la tarjeta en funcion de su DimensionID y de su ProdNameID
export async function getProductByIDS(req: Request, res: Response) {
  try {
    const {ProdNameID, DimensionID} = req.query
    
    const query = `SELECT * FROM NaturaliStone.Products where Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID};`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /IDs");
          res.status(404).json("No products match this search");
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

export async function getAllMaterials(req: Request, res: Response) {
  try {
    const query = `SELECT GROUP_CONCAT(DISTINCT ProdNames.Material SEPARATOR ', ') AS Materials
                    FROM ProdNames;
                    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /material");
          res.status(404).json("No material");
        } else {
          const materialesRowData = results as RowDataPacket[]; // Convertir a tipo RowDataPacket[]
          const materialesString = materialesRowData.map((row) => row.Materials)[0]; // Obtener la cadena de materiales
          const materialesArray = materialesString.split(", ").map((material) => material.trim()); // Dividir la cadena y eliminar los espacios en blanco       
          res.status(200).json(materialesArray) 
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

