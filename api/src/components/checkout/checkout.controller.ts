import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { Stripe } from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });


export async function newCheckout(req: Request, res: Response) {
  try {
    const { CustomerId } = req.body;

    let cartItems = [];
    const query = `SELECT 
                      Cart.idCartEntry,
                      Cart.Quantity,
                      Cart.CustomerID, 
                      Cart.SalePrice,
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
                    WHERE Cart.CustomerID = ${CustomerId};
                    `;

    mysqlConnection.query(
      query,
      [CustomerId],
      async (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en cartRoutes.get /:id");
          res.status(404).json("No products in cart");
        } else {
          //console.log(results)
          cartItems = results;
          const stripe = new Stripe("sk_test_51Nj4n7HOF5hpx4Gm5rvMJmro7oOXpNnpShHm8DXZ9kUJlQUJAUJBJyIQbSnI6GvoKbMJkERPz8Ofk1neCRRIACgo00DmNvlFRD", {
            apiVersion: "2023-08-16",
          });
          try {
            // Create Checkout Sessions from body params.
            let itemsCart = [];
            for (let index = 0; index < cartItems.length; index++) {
              const element = cartItems[index];
              element.SalePrice = element.SalePrice * 100;
              console.log("SalePrice: ", element.toString())
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
              itemsCart.push(item);
            }
            console.log(itemsCart)

            const session = await stripe.checkout.sessions.create({
              line_items: itemsCart,
              mode: "payment",
              success_url: "http://localhost:3000/checkoutResult?status=success",
              cancel_url: "http://localhost:3000/checkout",
            });

            const paymentIntent = await stripe.paymentIntents.create({
              currency: "USD",
              amount: 1999,
              // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
              automatic_payment_methods: { enabled: true }
            });

            console.log(paymentIntent);

            console.log(session.id);
            res.status(200).json({ sessionId: session.id, intento: paymentIntent });
          } catch (err) {
            console.log(err)
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

export async function updateCheckout(req: Request, res: Response) {
  try {
    const { CustomerId } = req.body;

    const query = `SELECT 
                      Cart.idCartEntry,
                      Cart.Quantity,
                      Cart.CustomerID, 
                      Cart.SalePrice,
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
                    WHERE Cart.CustomerID = ${CustomerId};
                    `;

    mysqlConnection.query(
      query,
      [CustomerId],
      async (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en cartRoutes.get /:id");
          res.status(404).json("No products in cart");
        } else {
          const naturaliInvoice = 1;
          const value = 1;
          const projectID = 1;
          const invoiceDate = new Date();
          const estDelivery_Date = new Date();
          const sellerID = 1;
          const shippingMethod = "tipo Envio";
          const shipTo = "ship to";
          const warehouse_Stamp = "Warehouse_Stamp";
          const payment_Stamp = "Payment_Stamp";
          const status = "Status";
          const modificationFlag = "ModificationFlag";
          const lastInsertDate = new Date();
          const updated_Date = new Date();
          const paymentTerms = "PaymentTerms";
          const p_O_No = "P_O_No";

          const queryInsertSale =
            `INSERT INTO Sales(Naturali_Invoice, Value, ProjectID, InvoiceDate,EstDelivery_Date,SellerID,ShippingMethod,ShipTo,Payment_Stamp,
              Status,ModificationFlag,LastInsertDate,Updated_Date,PaymentTerms,P_O_No) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
          const saleValues = [naturaliInvoice, value, projectID, invoiceDate, estDelivery_Date, sellerID, shippingMethod, shipTo, warehouse_Stamp,
            payment_Stamp, status, modificationFlag, lastInsertDate, updated_Date, paymentTerms, p_O_No];

          mysqlConnection.query(
            queryInsertSale,
            saleValues,
            (
              insertError: MysqlError,
              insertResults: RowDataPacket[],
              insertFields: FieldInfo[]
            ) => {
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
                      .send("Nueva entrada en ventas creada");
                  }
                });
              }
            }
          );

        }
      }
    );



  } catch (error) {
    console.log(error);
    res.status(409).send(error);
  }
}

