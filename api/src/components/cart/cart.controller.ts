import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";

export async function newCartEntry(req: Request, res: Response) {
  try {
    const { size, thickness, finish, ProdNameID, quantity, customerID } =
      req.body;

    mysqlConnection.beginTransaction((beginTransactionError: MysqlError) => {
      if (beginTransactionError) {
        console.log("Error al iniciar la transacción: ", beginTransactionError);
        res.status(500).json({ error: beginTransactionError.message });
        return;
      }
      if (size !== "") {
        const queryGetDimension = `SELECT * FROM Dimension WHERE Dimension.Size = "${size}" AND Dimension.Thickness = "${thickness}" AND Dimension.Finish = "${finish}"`;

        mysqlConnection.query(
          queryGetDimension,
          (
            dimensionError: MysqlError,
            dimensionResults: RowDataPacket[],
            dimensionFields: FieldInfo[]
          ) => {
            if (dimensionError) {
              console.log(
                "Error en la consulta queryGetDimension: ",
                dimensionError
              );
              mysqlConnection.rollback(() => {
                console.log(
                  "Rollback realizado debido a un error en queryGetDimension"
                );
                res.status(500).json({ error: dimensionError.message });
              });
              return;
            }

            const dimension = dimensionResults[0];
            const DimensionID = dimension.DimensionID;

            const queryGetProdID = `SELECT * FROM NaturaliStone.Products WHERE Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID}`;

            mysqlConnection.query(
              queryGetProdID,
              (
                prodError: MysqlError,
                prodResults: RowDataPacket[],
                prodFields: FieldInfo[]
              ) => {
                if (prodError) {
                  console.log(
                    "Error en la consulta queryGetProdID: ",
                    prodError
                  );
                  mysqlConnection.rollback(() => {
                    console.log(
                      "Rollback realizado debido a un error en queryGetProdID"
                    );
                    res.status(500).json({ error: prodError.message });
                  });
                  return;
                }

                // Maneja el resultado undefined de la query, en caso de que la convinacion ProdNameID y DimensionID no
                // exista en la db

                // ---------------------------------
                if (prodResults.length === 0) {
                  console.log(
                    "El resultado de queryGetProdID es indefinido o vacío."
                  );
                  mysqlConnection.rollback(() => {
                    console.log(
                      "Rollback realizado debido a un resultado indefinido o vacío en queryGetProdID"
                    );
                    res.status(404).json({ error: "Producto no encontrado" });
                  });
                  return;
                }
                //----------------------------------
                const product = prodResults[0];

                const queryInsertCart =
                  "INSERT INTO Cart(CustomerID, ProductID, Quantity,ToInvoice,AddExtra) VALUES (?, ?, ?, ?, ?)";
                const cartValues = [
                  customerID,
                  product.ProdID,
                  1,
                  0,
                  0
                ];

                mysqlConnection.query(
                  queryInsertCart,
                  cartValues,
                  (
                    insertError: MysqlError,
                    insertResults: RowDataPacket[],
                    insertFields: FieldInfo[]
                  ) => {
                    if (insertError) {
                      console.log(
                        "Error en la consulta queryInsertCart: ",
                        insertError
                      );
                      mysqlConnection.rollback(() => {
                        console.log(
                          "Rollback realizado debido a un error en queryInsertCart"
                        );
                        res.status(500).json({ error: insertError.message });
                      });
                    } else {
                      mysqlConnection.commit((commitError: MysqlError) => {
                        if (commitError) {
                          console.log(
                            "Error al realizar el commit: ",
                            commitError
                          );
                          mysqlConnection.rollback(() => {
                            console.log(
                              "Rollback realizado debido a un error en el commit"
                            );
                            res
                              .status(500)
                              .json({ error: commitError.message });
                          });
                        } else {
                          console.log("Datos OK");
                          res
                            .status(200)
                            .send("Nueva entrada en el carrito creada");
                        }
                      });
                    }
                  }
                );
              }
            );
          }
        );
      } else {
        const queryGetProdID = `SELECT Dimension.*, Products.* FROM Products
        LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
        WHERE Dimension.Finish = "${finish}"
        AND Dimension.Type = "Sample"
        AND Products.ProdNameID = ${ProdNameID}
        `;
        // const queryGetProdID = `SELECT * FROM NaturaliStone.Products WHERE Products.ProdNameID = ${ProdNameID}`;

        mysqlConnection.query(
          queryGetProdID,
          (
            prodError: MysqlError,
            prodResults: RowDataPacket[],
            prodFields: FieldInfo[]
          ) => {
            if (prodError) {
              console.log("Error en la consulta queryGetProdID: ", prodError);
              mysqlConnection.rollback(() => {
                console.log(
                  "Rollback realizado debido a un error en queryGetProdID"
                );
                res.status(500).json({ error: prodError.message });
              });
              return;
            }

            // Maneja el resultado undefined de la query, en caso de que la convinacion ProdNameID y DimensionID no
            // exista en la db

            // ---------------------------------
            if (prodResults.length === 0) {
              console.log(
                "El resultado de queryGetProdID es indefinido o vacío."
              );
              mysqlConnection.rollback(() => {
                console.log(
                  "Rollback realizado debido a un resultado indefinido o vacío en queryGetProdID"
                );
                res.status(404).json({ error: "Producto no encontrado" });
              });
              return;
            }
            //----------------------------------
            const product = prodResults[0];

            console.log("prou", product);

            const queryCheckCart = `SELECT ProductID FROM Cart WHERE ProductID = ${product.ProdID}`;
            mysqlConnection.query(
              queryCheckCart,
              (
                prodError: MysqlError,
                prodResults: RowDataPacket[],
                prodFields: FieldInfo[]
              ) => {
                if (prodError) {
                  console.log(
                    "Error en la consulta queryGetProdID: ",
                    prodError
                  );
                  mysqlConnection.rollback(() => {
                    console.log(
                      "Rollback realizado debido a un error en queryGetProdID"
                    );
                    res.status(500).json({ error: prodError.message });
                  });
                  return;
                }

                if (prodResults.length === 0) {
                  const queryInsertCart =
                    "INSERT INTO Cart(CustomerID, ProductID, Quantity) VALUES (?, ?, ?, )";
                  const cartValues = [customerID, product.ProdID, 0, ];

                  mysqlConnection.query(
                    queryInsertCart,
                    cartValues,
                    (
                      insertError: MysqlError,
                      insertResults: RowDataPacket[],
                      insertFields: FieldInfo[]
                    ) => {
                      if (insertError) {
                        console.log(
                          "Error en la consulta queryInsertCart: ",
                          insertError
                        );
                        mysqlConnection.rollback(() => {
                          console.log(
                            "Rollback realizado debido a un error en queryInsertCart"
                          );
                          res.status(500).json({ error: insertError.message });
                        });
                      } else {
                        mysqlConnection.commit((commitError: MysqlError) => {
                          if (commitError) {
                            console.log(
                              "Error al realizar el commit: ",
                              commitError
                            );
                            mysqlConnection.rollback(() => {
                              console.log(
                                "Rollback realizado debido a un error en el commit"
                              );
                              res
                                .status(500)
                                .json({ error: commitError.message });
                            });
                          } else {
                            console.log("Datos OK");
                            res
                              .status(200)
                              .send("Nueva entrada en el carrito creada");
                          }
                        });
                      }
                    }
                  );
                } else {
                  res.status(200).send("Ya existe en el carrito");
                }
              }
            );
          }
        );
      }
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
                      Cart.AddExtra,
                      Cart.ToInvoice,
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
                    WHERE Cart.CustomerID = ${customerID};
                    `;

    mysqlConnection.query(
      query,
      [customerID],
      (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en cartRoutessssss.get /:id");
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
