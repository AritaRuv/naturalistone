/* eslint-disable quotes */
import mysqlConnection from "../../db";
import { Response, Request, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function register(req: Request, res: Response) {
  const { fullName, email, password } = req.body;
  try {
    mysqlConnection.beginTransaction(function (err) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "error in post /register" });
      }

      const _query = `INSERT INTO Customers (Contact_Name, Email) Values("${fullName}", "${email}")`;

      mysqlConnection.query(_query, function (err, results, fields) {
        console.log("soy restuls1", results);
        if (err) {
          res
            .status(400)
            .json({ success: false, msg: "error in create customer" });
          return mysqlConnection.rollback(function (err) {
            throw err;
          });
        }
        const customerId = results.insertId;

        const _query1 = `INSERT INTO Customer_Login (CustomerID, Username, Password) Values ("${customerId}", "${email}", "${password}")`;

        mysqlConnection.query(_query1, function (err, results, fields) {
          if (err) {
            res
              .status(400)
              .json({ success: false, msg: "error in register user" });
            return mysqlConnection.rollback(function (err) {
              throw err;
            });
          }

          return mysqlConnection.commit(function (err) {
            if (err) {
              res
                .status(500)
                .json({ success: false, msg: "failed to register user" });
              return mysqlConnection.rollback(function () {
                throw err;
              });
            }

            console.log("Register committed successfully");

            res
              .status(200)
              .json({ success: true, msg: "user create successfully" });
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "general_error" + error });
  }
}

export async function generateJWT(user = "", expiresAt = 0) {
  const payload = user;
  console.log("soy payload", payload);
  const SECRETKEY = process.env.SECRET_KEY;

  const options: any = {};

  if (expiresAt > 0) {
    options.expiresAt = 60 * expiresAt;
  }

  const token = sign(payload, SECRETKEY, options);

  return token;
}

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, msg: "no token" });
  }

  token = token.split(" ")[1];

  verify(token, process.env.SECRET_KEY, function (err, data) {
    if (err) {
      res.status(401).json("invalid_token");
    }
    res.status(200).json(data);
    next();
  });
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const _query = `SELECT * FROM Customer_Login WHERE Username = "${email}" AND Password="${password}"`;

    mysqlConnection.query(_query, async function (err, results) {
      if (!results.length) {
        return res
          .status(400)
          .json({ success: false, msg: "customer not found" });
      }

      console.log("results", results);

      const token = await generateJWT(results[0].Customer_LoginID);

      console.log("entree", token);

      results[0].token = token;

      return res.status(200).json({ success: true, results: results[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "general error" });
  }
}

export async function protectedRoute() {
  return "hola";
}

export async function userInfo(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, msg: "no token" });
    }

    console.log("soy token,", token);

    const validateToken = verify(token, process.env.SECRET_KEY);

    console.log("soy validate", validateToken);

    const query_ = `SELECT Customers.CustomerID, Customers.Contact_Name, Customers.Company, Customer_Login.Username,
    Customer_Login.Customer_LoginID FROM Customers
    LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Customers.CustomerID
    WHERE Customer_Login.Customer_LoginID = "${validateToken}"`;

    mysqlConnection.query(query_, function (err, results) {
      if (!results.length) {
        return res.status(400).json({ success: false, msg: "User not found" });
      }

      return res.status(200).json({ success: true, data: results[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: "General error" });
  }
}
