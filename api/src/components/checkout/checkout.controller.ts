import { FieldInfo, MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { FieldPacket, RowDataPacket } from "mysql2";
import { Stripe } from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

interface ProductsCart {
  ProdID: number;
  IdCartEntry: number;
  Quantity: number;
  CustomerID: number;
  AddExtra: number;
  ToInvoice: number;
  SalePrice: number;
}

export async function newCheckout(req: Request, res: Response) {
  try {
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
    //Status of this PaymentIntent, one of: 
    //requires_payment_method, requires_confirmation, requires_action, processing, 
    //requires_capture, canceled, or succeeded
    const { customerId, projectId,payments,receive,address } = req.body;
    const errores: string[] = [];
    const items: ProductsCart[] = await getCartItems(customerId);
    
    if(items.length === 0){
      errores.push("No se encontraron items en el carrito.");
      res.status(500).json(errores);
      return;
    }

    mysqlConnection.beginTransaction(async function (err) {
      const resultadoSale = await saveSale(payments, projectId, receive, address);
      
      if (resultadoSale <= 0){
        errores.push("Hubo un error al intentar guardar la venta.");
        res.status(500).json(errores);
        return;
      }
     
      const resultadoProdsSale = await saveProdSold(resultadoSale, items);
      if(resultadoProdsSale <= 0){
        errores.push("Error al intentar guardar productos en productos vendidos");
        mysqlConnection.rollback(function (){
          res.status(500).json(errores);
          return;
        });
      }
      const resultadoSavePayments = await savePayments(resultadoSale, payments);
      if (resultadoSavePayments <= 0) {
        errores.push("Error al intentar guardar pagos");
        mysqlConnection.rollback(function () {
          res.status(500).json(errores);
          return;
        });
      }
      const resultadoClearCart = await clearCart(items);
      if (resultadoClearCart <= 0) {
        errores.push("Error al intentar vaciar carrito");
        mysqlConnection.rollback(function () {
          res.status(500).json(errores);
          return;
        });
      }
      mysqlConnection.commit();
      res.status(200).json("Operacion existosa");
      return;
    });
    
  } catch (error) {
    console.log(error);
    res.status(409).send(error);
  }
}

async function getLastSaleNumber(): Promise<number> {
  let invoiceID: number;
  const querySelectLastInvoince = "SELECT MAX(Naturali_Invoice) AS ultimo FROM Sales";
  try {
    return new Promise(data => {
      mysqlConnection.query(querySelectLastInvoince, (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          console.log("Error al intentar obtener la ultima venta");
          data(0);
        }
        else {
          const { ultimo } = results[0];
          invoiceID = ultimo;
          data(invoiceID);
        }
      });
    });
   
  } catch (err) {
    console.log("Error al intentar obtener la ultima venta. ",err);
    return 0;
  }

}

async function getCartItems(customerId: number): Promise<ProductsCart[]> {

  const query = `SELECT Products.ProdID, Cart.idCartEntry, Cart.Quantity, Cart.CustomerID, Cart.AddExtra, 
        Cart.ToInvoice, Products.SalePrice, Cart.AddExtra
        FROM NaturaliStone.Cart
        LEFT JOIN Products ON Cart.ProductID = Products.ProdID
        WHERE Cart.CustomerID = ${customerId} and Cart.ToInvoice = 1 ;`;
  const arrayItems: ProductsCart[] = [];

  try{
    return new Promise(data => {
      mysqlConnection.query(query, [customerId], async (error: MysqlError, results: RowDataPacket[], fields: FieldInfo[]) => {
        if (error) {
          console.log("Error al obtener items del cart ", error);
        }
        else {
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            const prod: ProductsCart = {
              AddExtra: 0,
              CustomerID: 0,
              ProdID: 0,
              Quantity: 0,
              SalePrice: 0,
              ToInvoice: 0,
              IdCartEntry: 0
            };
            prod.ProdID = element.ProdID;
            prod.Quantity = element.Quantity;
            prod.CustomerID = element.CustomerID;
            prod.AddExtra = element.AddExtra;
            prod.ToInvoice = element.ToInvoice;
            prod.SalePrice = element.SalePrice;
            prod.IdCartEntry = element.idCartEntry;
            arrayItems.push(prod);
          }
          data(arrayItems);
        }
      });
    });
  
  }catch(err){
    console.log("Error al obtener items del cart ", err);
    return arrayItems;

  }
}

async function saveSale(payments: any, projectID: number, receive: number, addressId: number): Promise<number> {

  const naturaliInvoice = await getLastSaleNumber();
  const value = payments.amount;
  const invoiceDate = new Date();
  const estDelivery_Date = new Date();
  const sellerID = 100;//web
  const shipTo = receive === 1 ? "Pick Up" : "";
  const warehouse_Stamp = "Warehouse_Stamp";
  const payment_Stamp = "Payment_Stamp";
  const status = "Confirmed";
  const modificationFlag = "ModificationFlag";
  const lastInsertDate = new Date();
  const paymentTerms = "PaymentTerms";
  const p_O_No = "P_O_No";

  const queryInsertSale = "INSERT INTO  Sales( Naturali_Invoice, Value, ProjectID,InvoiceDate, EstDelivery_Date, SellerID, ShippingMethod, ShipTo, Warehouse_Stamp,Payment_Stamp, Status, ModificationFlag, LastInsertDate, PaymentTerms, P_O_No,billing_address_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const saleValues = [naturaliInvoice + 1, value, projectID, invoiceDate, estDelivery_Date, sellerID, receive, shipTo, warehouse_Stamp,
    payment_Stamp, status, modificationFlag, lastInsertDate, paymentTerms, p_O_No,addressId];

  try {
    return new Promise(data => {
      mysqlConnection.query(queryInsertSale, saleValues, (insertError: MysqlError,
        insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
        if (insertError){
          console.log("Error en la consulta queryInsertSale: ", insertError,);
          data(0);
        }
        else{
          console.log("Venta guardada correctamente.");
          data(naturaliInvoice + 1);
        }
      });
    });

  }catch(err){
    console.log("Error al intentar guardar en sales:",err);
    return 0;
  }


}

async function saveProdSold(saleID:number, products: ProductsCart[]): Promise <number> {
  try{
    return new Promise(data => {
    //  
      for (let index = 0; index < products.length; index++) {
        const prod = products[index];
        const queryInsertProdSold = `INSERT INTO ProdSold 
        (SaleID,ProdID,Quantity,SalePrice,Delivered,InStock_Reserved,InStock_PendingPayment,Incoming_Reserved,
          Incoming_PendingPayment,Order_PaymentCompleted,Order_PendingPayment, InsertDate,Status,Updated_Date) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const prodSoldValues = [saleID, prod.ProdID, prod.Quantity, prod.SalePrice, 0, 0, 0, 0, 0, 0, 0, new Date(), "Pending", new Date()];
      
        mysqlConnection.query(queryInsertProdSold, prodSoldValues, 
          async (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
            if (insertError) {
              console.log("Error al instar guardar productos en prodSold ",insertError);
              data(0);
            }
          });
      }
      data(1);
      console.log("Productos vendidos guardados correctamente.");
    });
  }catch(error){
    console.log("Error al instar guardar productos en prodSold",error);
    return 0;
  }
}

async function savePayments(saleID: number, payments: any): Promise <number>{

  try {
    const stripe = new Stripe("sk_test_51NkvaEEOX6Zo63RnBN8K5AOzuLsEEkFhPnd8VINSf8ubDiLjvHtw6bTos6cSokBZBhr97cMBNCPckEV8ouFyr5Ll00Io7AsEYT", {
      apiVersion: "2023-08-16",
    });
    const paymentMethod = await stripe.paymentMethods.retrieve(
      payments.payment_method
    );
    return new Promise(data => {
      //GUARDO EN Payments
      const queryInserPayments = `INSERT INTO NaturaliStone.Payments 
      (InvoiceID,Amount,Method,Date,SellerID,TransactionID,PaymentStatus) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`;
      const paymentValues = [saleID, payments.amount, paymentMethod.type, new Date(), 100, paymentMethod.id, payments.status];
      mysqlConnection.query(queryInserPayments, paymentValues, 
        (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
          if (insertError) {
            console.log("Error al intentar guardar pago. ", insertError);
            data(0);
          }
          else{
            console.log("Pago guardado correctamente. ");
            data(1);
          }
        });
    });
  } catch (error) {
    console.log("Error al intentar guardar pago. ",error);
    return 0;
  }
}

async function clearCart(products: ProductsCart[]): Promise<number> {

  try {
  
    return new Promise(data => {
      //Vacio el cart
      products.forEach((prod) =>{
        //
        const queryEmptyCart = "DELETE FROM NaturaliStone.Cart WHERE idCartEntry = ?;";
        const cartValues = [prod.IdCartEntry];
        mysqlConnection.query(queryEmptyCart, cartValues,
          (insertError: MysqlError, insertResults: RowDataPacket[], insertFields: FieldInfo[]) => {
            if (insertError) {
              console.log("Error al intentar guardar pago. ", insertError);
              data(0);
            }
            else {
              console.log("Pago guardado correctamente. ");
              data(1);
            }
          });
      });

     
    
    });
  } catch (error) {
    console.log("Error al intentar guardar pago. ", error);
    return 0;
  }
}
