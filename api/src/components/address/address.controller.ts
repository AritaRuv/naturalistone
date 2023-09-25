import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { verify } from "jsonwebtoken";

export async function getAllCustomerAddress(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
  
    if(!token) {
      return res.status(200).json({ success: false, results: "no token" });
    }
    const customerLoginId = verify(token, process.env.SECRET_KEY);
  
    const query = ` SELECT
                        Address.*
                      FROM Address
                      LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Address.customer_id
                      WHERE Customer_Login.Customer_LoginID = ${customerLoginId}
                    `;
  
    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("No address");
          res.status(200).json({ success: false, results: [] });
        } else {
          console.log("Address OK");
          res.status(200).json({ success: true, results: results });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}