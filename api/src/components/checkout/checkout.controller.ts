import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { FieldPacket, RowDataPacket } from "mysql2";
import { Stripe } from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });


export async function newCheckout(req: Request, res: Response) {
  try {
    console.log("entro ");
    const { CustomerId } = req.body;
    let cartItems = [];
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
                    WHERE Cart.CustomerID = ${CustomerId} and Cart.ToInvoice = 1 ;
                    `;


    mysqlConnection.query(
      query,
      [CustomerId],
      async (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en cartRoutes.post /:id");
          res.status(404).json("No products in cart");
        } else {
          //console.log(results)
          cartItems = results;
          // const stripe = new Stripe("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", {
          //   apiVersion: "2023-08-16",
          // });
          const stripe = new Stripe("sk_test_51NkvaEEOX6Zo63RnBN8K5AOzuLsEEkFhPnd8VINSf8ubDiLjvHtw6bTos6cSokBZBhr97cMBNCPckEV8ouFyr5Ll00Io7AsEYT", {
            apiVersion: "2023-08-16",
          });
          try {
            let sumaTotal = 0;
            // Create Checkout Sessions from body params.
            const itemsCart = [];
            for (let index = 0; index < cartItems.length; index++) {
              const element = cartItems[index];
              element.SalePrice = element.SalePrice * 100;
              const item = {
                price_data: {
                  currency: "usd",
                  unit_amount: element.SalePrice.toString().replace(".", ""),
                  product_data: {
                    name: element.Material + " " + element.Naturali_ProdName,
                    images: []
                  },
                },
                quantity: element.Quantity,
              };
              sumaTotal = sumaTotal + element.SalePrice;
              itemsCart.push(item);
            }

            const session = await stripe.checkout.sessions.create({
              line_items: itemsCart,
              mode: "payment",
              success_url: "http://localhost:3000/checkoutResult?status=success",
              cancel_url: "http://localhost:3000/checkout",
            });


            const paymentIntent = await stripe.paymentIntents.create({
              currency: "USD",
              amount: sumaTotal,
              // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
              automatic_payment_methods: { enabled: true }
            });
            res.status(200).json({ sessionId: session.id, intento: paymentIntent });
          } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).json(err.message);
          }
          cartItems = results;
        }
      }
    );



  } catch (error) {
    console.log(error);
    res.status(409).send(error);
  }
}

export async function confirmCheckout(req: Request, res: Response) {
  try {

    const { CustomerId, ProjectId, ShippingMethod,Payments } = req.body;

    const query = `SELECT Products.ProdID, Cart.idCartEntry, Cart.Quantity, Cart.CustomerID, Cart.AddExtra, Cart.ToInvoice,Products.SalePrice, Dimension.Type,
                      Dimension.Size, Dimension.Thickness, Dimension.Finish, ProdNames.Naturali_ProdName, ProdNames.Material 
                      FROM NaturaliStone.Cart
                      LEFT JOIN Products ON Cart.ProductID = Products.ProdID
                      LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                      LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                      WHERE Cart.CustomerID = ${CustomerId} and Cart.ToInvoice = 1 ;`;

    mysqlConnection.query(
      query,
      [CustomerId],
      async (error: MysqlError, resultado: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (resultado.length === 0) {
          console.log("Error en checkout.patch");
          res.status(404).json("No products in cart");
        } else {
          const naturaliInvoice = 1;
          const value = Payments.amount;
          const projectID = ProjectId;
          const invoiceDate = new Date();
          const estDelivery_Date = new Date();
          const sellerID = 100;//web
          const shippingMethod = ShippingMethod;
          const shipTo = "ship to";
          const warehouse_Stamp = "Warehouse_Stamp";
          const payment_Stamp = "Payment_Stamp";
          const status = "Status";
          const modificationFlag = "ModificationFlag";
          const lastInsertDate = new Date();
          const paymentTerms = "PaymentTerms";
          const p_O_No = "P_O_No";
          const querySelectLastInvoince = "SELECT MAX(Naturali_Invoice) AS ultimo FROM Sales";
          mysqlConnection.query(
            querySelectLastInvoince,
            (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
              if (error) {
                throw error;
              }
              if (results.length === 0) {
                console.log("Error en productsRoutes.get /");
                res.status(404).json("No colors");
              } else {
                const { ultimo } = results[0];
                console.log("ultima venta:", ultimo);
                const queryInsertSale = `INSERT INTO 
                Sales(
                    Naturali_Invoice,
                    Value, 
                    ProjectID,
                    InvoiceDate,
                    EstDelivery_Date,
                    SellerID,
                    ShippingMethod,
                    ShipTo,
                    Warehouse_Stamp,
                    Payment_Stamp, 
                    Status,
                    ModificationFlag,
                    LastInsertDate,
                    PaymentTerms,
                    P_O_No)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                const saleValues = [ultimo + 1, value, projectID, invoiceDate, estDelivery_Date, sellerID, shippingMethod, shipTo, warehouse_Stamp,
                  payment_Stamp, status, modificationFlag, new Date(),  paymentTerms, p_O_No];

                mysqlConnection.query(queryInsertSale, saleValues, (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
                  if (insertError) {
                    console.log(
                      "Error en la consulta queryInsertSale: ",
                      insertError
                    );
                    mysqlConnection.rollback(() => {
                      console.log(
                        "Rollback realizado debido a un error en queryInsertSale"
                      );
                      res.status(500).json({ error: insertError.message });
                    });
                  } else {
                    //GUARDO EN ProdSold
                    for (let index = 0; index < resultado.length; index++) {
                      const element = resultado[index];
                      console.log("elemento",element);
                      const queryInsertProdSold = `INSERT INTO ProdSold (SaleID,ProdID,Quantity,SalePrice,Delivered,InStock_Reserved,InStock_PendingPayment,Incoming_Reserved,Incoming_PendingPayment,Order_PaymentCompleted,Order_PendingPayment,
                        InsertDate,Status,Updated_Date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                      const prodSoldValues = [ultimo + 1, element.ProdID, element.Quantity, element.SalePrice, 0, 0,
                        0, 0, 0, 0, 0, new Date(), "Pending", new Date()];
                      mysqlConnection.query(queryInsertProdSold, prodSoldValues, async (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
                        if (insertError) {
                          console.log(
                            "Error en la consulta queryInsertProdSold: ",
                            insertError
                          );
                          mysqlConnection.rollback(() => {
                            console.log(
                              "Rollback realizado debido a un error en queryInsertSale"
                            );
                            res.status(500).json({ error: insertError.message });
                          });
                        } else {
                          //GUARDO EN Payments
                          const stripe = new Stripe("sk_test_51NkvaEEOX6Zo63RnBN8K5AOzuLsEEkFhPnd8VINSf8ubDiLjvHtw6bTos6cSokBZBhr97cMBNCPckEV8ouFyr5Ll00Io7AsEYT", {
                            apiVersion: "2023-08-16",
                          });
                          const paymentMethod = await stripe.paymentMethods.retrieve(
                            Payments.payment_method
                          );
                          console.log("payment:", paymentMethod);

                          const queryInserPayments = "INSERT INTO NaturaliStone.Payments (InvoiceID,Amount,Method,Date,`By`,TransactionID,PaymentStatus) VALUES (?, ?, ?, ?, ?, ?, ?);";
                          const paymentValues = [ultimo + 1, Payments.amount, paymentMethod.type, new Date(), 0, paymentMethod.id, Payments.status];
                          mysqlConnection.query(queryInserPayments, paymentValues, (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
                            if (insertError) {
                              console.log("Error en la consulta queryEmptyCart: ", insertError);
                              mysqlConnection.rollback(() => { console.log("Rollback realizado debido a un error en queryInserPayments");
                                res.status(500).json({ error: insertError.message });
                              });
                            } else {
                              const queryEmptyCart = `DELETE FROM NaturaliStone.Cart WHERE Cart.CustomerID = ${CustomerId} and Cart.ToInvoice = 1 ;`;
                              mysqlConnection.query(queryEmptyCart, (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
                                if (insertError) {
                                  console.log("Error en la consulta queryEmptyCart: ", insertError);
                                  mysqlConnection.rollback(() => {
                                    console.log("Rollback realizado debido a un error en queryEmptyCart");
                                    res.status(500).json({ error: insertError.message });
                                  });
                                } else {
                                  mysqlConnection.commit(function (err) {
                                    if (err) {
                                      res
                                        .status(500)
                                        .json({ success: false, msg: "failed to signup user" });
                                      return mysqlConnection.rollback(function () {
                                        throw err;
                                      });
                                    }
                                    return res.status(200).json({
                                      success: true,
                                      msg: "user create successfully",

                                    });
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  }
                });
                res.status(200).json(results);
              }
            });
        }
      });



  } catch (error) {
    console.log(error);
    res.status(409).send(error);
  }
}

