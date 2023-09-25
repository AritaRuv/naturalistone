import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";
import { verify } from "jsonwebtoken";


export async function newCartEntry(req: Request, res: Response) {
  try {
    const { ProdID } = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(200).json({ success: false, results: "no token" });
    }
    const customerLoginId = verify(token, process.env.SECRET_KEY);

    // Consulta para obtener el CustomerID
    const queryGetCustomerID = `SELECT CustomerID FROM NaturaliStone.Customer_Login WHERE Customer_LoginID = ${customerLoginId}`;
    mysqlConnection.query(
      queryGetCustomerID,
      (
        customerError: MysqlError,
        customerResults: RowDataPacket[],
        customerFields: FieldInfo[]
      ) => {
        if (customerError) {
          console.log("Error en la consulta queryGetCustomerID: ", customerError);
          res.status(500).json({ error: customerError.message });
          return;
        }

        const customerID = customerResults[0].CustomerID;

        mysqlConnection.beginTransaction((beginTransactionError: MysqlError) => {
          if (beginTransactionError) {
            console.log("Error al iniciar la transacción: ", beginTransactionError);
            res.status(500).json({ error: beginTransactionError.message });
            return;
          }

          const queryCheckCart = `SELECT ProductID FROM Cart WHERE ProductID = ${ProdID}`;
          mysqlConnection.query(
            queryCheckCart,
            (
              prodError: MysqlError,
              prodResults: RowDataPacket[],
              prodFields: FieldInfo[]
            ) => {
              if (prodError) {
                console.log("Error en la consulta queryCheckCart: ", prodError);
                mysqlConnection.rollback(() => {
                  console.log("Rollback realizado debido a un error en queryCheckCart");
                  res.status(500).json({ error: prodError.message });
                });
                return;
              }

              if (prodResults.length === 0) {
                const queryInsertCart =
                  "INSERT INTO Cart(CustomerID, ProductID, Quantity) VALUES (?, ?, ? )";
                const cartValues = [customerID, ProdID, 1];

                mysqlConnection.query(
                  queryInsertCart,
                  cartValues,
                  (
                    insertError: MysqlError,
                    insertResults: RowDataPacket[],
                    insertFields: FieldInfo[]
                  ) => {
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
                          console.log("Post Cart OK");
                          res.status(200).send("Nueva entrada en el carrito creada");
                        }
                      });
                    }
                  }
                );
              } else {
                console.log("Ya existe en el carrito");
                res.status(200).send("Ya existe en el carrito");
              }
            }
          );
        });
      }
    );

  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getCartProducts(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;

    if(!token){
      return res.status(200).json({ success: false, results: "no token" });
    }else{
      const customerLoginId = verify(token, process.env.SECRET_KEY);
      const query = `SELECT 
                        Cart.idCartEntry,
                        Cart.Quantity,
                        Cart.CustomerID,
                        Cart.AddExtra,
                        Cart.ToInvoice,
                        Products.SalePrice,
                        Dimension.Type,
                        Dimension.Size,
                        Dimension.Thickness,
                        Dimension.Finish,
                        ProdNames.Naturali_ProdName,
                        ProdNames.Material,
                        Customer_Login.Customer_LoginID
                      FROM NaturaliStone.Cart
                      LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                      LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                      LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                      LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Cart.CustomerID
                      WHERE Customer_Login.Customer_LoginID = ${customerLoginId};
                      `;
      
      mysqlConnection.query(
        query,
        (error: MysqlError, results: RowDataPacket[]) => {
          if (error) {
            throw error;
          }
          if (results.length === 0) {
            console.log("No products in cart");
            res.status(200).json({ success: true, results: []});
          } else {
            console.log("Fetch cart products OK");
            res.status(200).json({ success: true, results: results});
          }
        }
      );
    } }catch (error) {
    res.status(409).send(error);
  }
}

export async function updateCartProducts(req: Request, res: Response) {
  try {
    const { Quantity, idCartEntry, ToInvoice,AddExtra } = req.body;

    const query = `UPDATE NaturaliStone.Cart SET Quantity = ${Quantity}, ToInvoice =${ToInvoice},AddExtra =${AddExtra} WHERE idCartEntry = ${idCartEntry}`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {

          console.log(`Error en cart.update cartEntry: ${idCartEntry}`);
          res
            .status(404)
            .json(`Error en cart.update cartEntry: ${idCartEntry}`);
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

export async function deleteCartProducts(req: Request, res: Response) {
  try {
    const { idCartEntry } = req.params;

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

export async function productCartLocal(req: Request, res: Response) {
  const { Size, Thickness, Finish, ProdNameID } = req.body;

  try {
    const productCartLocalQuery = `SELECT Dimension.*, ProdNames.*, Products.* FROM Products
LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
WHERE Dimension.Size = "${Size}" AND Dimension.Thickness = "${Thickness}" 
AND Dimension.Finish = "${Finish}" AND ProdNames.ProdNameID = ${ProdNameID}`;

    mysqlConnection.query(
      productCartLocalQuery,
      function (err: MysqlError, results: RowDataPacket) {
        if (err) {
          return res
            .status(400)
            .json({ msg: "Error in get product cart local", error: err });
        }
        if (!results.length) {
          return res
            .status(400)
            .json({ msg: "Product cart local not found", data: [] });
        }

        return res
          .status(200)
          .json({ msg: "Get product successful", data: results });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "General Error in get product cart local", error });
  }
}
