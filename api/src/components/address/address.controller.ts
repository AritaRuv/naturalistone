import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { verify } from "jsonwebtoken";
import { Address } from "../../interfaces/address";

interface Resultado {
  Id: number,
  Message: string
}

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
          res.status(200).json({ success: false, results: [] });
        } else {
          const addresses : Address[] = [];
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            const el : Address = {
              AddressId: element.address_id,
              Address: element.address,
              Address2: element.address_2,
              City: element.city,
              CustomerId: element.customer_id,
              Nickname: element.nickname,
              State: element.state,
              ZipCode: element.zip_code
            };
            addresses.push(el);
          }
          res.status(200).json({ success: true, results: addresses });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function postNewAddress(req: Request, res: Response) {

  try {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ success: false, results: "no token" });
    const { Nickname, CustomerId, Address, Address2,City, ZipCode,State} = req.body;

    const address : Address = {
      Nickname,
      CustomerId,
      Address,
      Address2,
      City,
      ZipCode,
      State,
      AddressId: 0
    };
    const resultado = await save(address);
    const { Id } = resultado;
    address.AddressId = Id;
    if (Id > 0){
      res.status(200).send(address);
    } 
    else{
      res.status(409).send(resultado.Message);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

async function save(address: Address): Promise<Resultado> {
  try {
    return new Promise(data => {
      const query = "INSERT INTO Address (Nickname,  Customer_Id, Address, Address2, City, State,Zip_Code) VALUES (?, ?, ?, ?, ?, ?,?)";
      const projectValues = [
        address.Nickname,
        address.CustomerId,
        address.Address,
        address.Address2,
        address.City,
        address.State,
        address.ZipCode,
      ];
      mysqlConnection.query(query, projectValues, (error: MysqlError, results: RowDataPacket,) => {
        if (error) {
          console.log(error);
          const res: Resultado = {
            Message: "Error to create address." + error,
            Id: -1,
          };
          data(res);
        }
        const { insertId } = results;
        const res: Resultado = {
          Message: "Address created successfully",
          Id: insertId
        };
       
        data(res);
        console.log("Address created successfully");      
      });
    });
  } catch (error) {
    const res: Resultado = {
      Message: "Error to create address." + error,
      Id: -1,
    };
    return res;
  }
}