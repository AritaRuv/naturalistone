import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
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
          const stripe = new Stripe("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", {
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
  console.log("Holaaaa");
  try {

    const { CustomerId, ProjectId, SecretStripe, ShippingMethod,Total } = req.body;

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
    console.log(query);


    mysqlConnection.query(
      query,
      [CustomerId],
      async (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en checkout.patch");
          res.status(404).json("No products in cart");
        } else {
          const naturaliInvoice = 1;
          const value = Total;
          const projectID = ProjectId;
          const invoiceDate = new Date();
          const estDelivery_Date = new Date();
          const sellerID = 1;
          const shippingMethod = ShippingMethod;
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

