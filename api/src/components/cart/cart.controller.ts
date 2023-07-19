import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function newCartEntry(req: Request, res: Response) {
  try {
    const { size, thickness, finish, ProdNameID } = req.body;

    mysqlConnection.beginTransaction((beginTransactionError: MysqlError) => {
      if (beginTransactionError) {
        console.log("Error al iniciar la transacción: ", beginTransactionError);
        res.status(500).json({ error: beginTransactionError.message });
        return;
      }

      const queryGetDimension = `SELECT * FROM Dimension WHERE Dimension.Size = "${size}" AND Dimension.Thickness = "${thickness}" AND Dimension.Finish = "${finish}"`;

      mysqlConnection.query(queryGetDimension, (dimensionError: MysqlError, dimensionResults: RowDataPacket[], dimensionFields: FieldInfo[]) => {
        if (dimensionError) {
          console.log("Error en la consulta queryGetDimension: ", dimensionError);
          mysqlConnection.rollback(() => {
            console.log("Rollback realizado debido a un error en queryGetDimension");
            res.status(500).json({ error: dimensionError.message });
          });
          return;
        }

        const dimension = dimensionResults[0];
        const DimensionID = dimension.DimensionID;

        const queryGetProdID = `SELECT * FROM NaturaliStone.Products WHERE Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID}`;

        mysqlConnection.query(queryGetProdID, (prodError: MysqlError, prodResults: RowDataPacket[], prodFields: FieldInfo[]) => {
          if (prodError) {
            console.log("Error en la consulta queryGetProdID: ", prodError);
            mysqlConnection.rollback(() => {
              console.log("Rollback realizado debido a un error en queryGetProdID");
              res.status(500).json({ error: prodError.message });
            });
            return;
          }

          const product = prodResults[0];
          const Quantity = 1;
          const CustomerID = 1938;

          const productSalePrice = product.SalePrice === null ? 1 : product.SalePrice

          const queryInsertCart = `INSERT INTO Cart(CustomerID, ProductID, Quantity, SalePrice) VALUES (?, ?, ?, ?)`;
          const cartValues = [CustomerID, product.ProdID, Quantity, productSalePrice];

          mysqlConnection.query(queryInsertCart, cartValues, (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
            if (insertError) {
              console.log("Error en la consulta queryInsertCart: ", insertError);
              mysqlConnection.rollback(() => {
                console.log("Rollback realizado debido a un error en queryInsertCart");
                res.status(500).json({ error: insertError.message });
              });
            } else {
              mysqlConnection.commit((commitError: MysqlError) => {
                if (commitError) {
                  console.log("Error al realizar el commit: ", commitError);
                  mysqlConnection.rollback(() => {
                    console.log("Rollback realizado debido a un error en el commit");
                    res.status(500).json({ error: commitError.message });
                  });
                } else {
                  console.log("Datos OK");
                  res.status(200).send('Nueva entrada en el carrito creada');
                }
              });
            }
          });
        });
      });
    });
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getCartProducts(req: Request, res: Response) {
    try {
  
      const customerID = req.params.id;
    
      const query = `SELECT 
                      Cart.idCartEntry,
                      Cart.Quantity,
                      Cart.CustomerID, 
                      Products.SalePrice,
                      Dimension.Type,
                      Dimension.Size,
                      Dimension.Thickness,
                      Dimension.Finish,
                      ProdNames.Naturali_ProdName,
                      ProdNames.Material
                    FROM NaturaliStone.Cart
                    LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                    LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                    LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                    WHERE Cart.CustomerID = 1938;
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

export async function updateCartProducts(req: Request, res: Response){
  try {
    const { Quantity, idCartEntry } = req.body
    console.log(req.body)
    const query = `UPDATE NaturaliStone.Cart SET Quantity = ${Quantity} WHERE idCartEntry = ${idCartEntry}`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log(`Error en cart.update cartEntry: ${idCartEntry}`);
          res.status(404).json(`Error en cart.update cartEntry: ${idCartEntry}`);
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

export async function deleteCartProducts(req: Request, res: Response){
  try {
    const { idCartEntry } = req.params

    const query = `DELETE FROM Cart WHERE  idCartEntry = ${idCartEntry}`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          res.status(200).json(`Error deleting cartEntry: ${idCartEntry}`);
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