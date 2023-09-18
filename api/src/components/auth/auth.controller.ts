/* eslint-disable quotes */
import mysqlConnection from "../../db";
import { Response, Request, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MysqlError } from "mysql";
import { RowDataPacket } from "mysql2";
import { aleatoryNumber } from "../../utils/aleatoryNumber";
import { tokenDate } from "../../utils/tokenDate";
import { sendEmailUser } from "../../utils/email";

export async function signUp(req: Request, res: Response) {
  const { fullName, email, password } = req.body;
  try {
    mysqlConnection.beginTransaction(function (err) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "error in post /signup" });
      }

      const query = `SELECT * FROM Customer_Login WHERE Username = "${email}"`;

      mysqlConnection.query(query, function (err, results) {
        if (results.length) {
          return res
            .status(400)
            .json({ success: false, msg: "Email already Exists" });
        }

        const _query = `INSERT INTO Customers (Contact_Name, Email) Values("${fullName}", "${email}")`;

        mysqlConnection.query(_query, function (err, results, fields) {
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

          mysqlConnection.query(
            _query1,
            async function (err, results_customer_login, fields) {
              if (err) {
                res
                  .status(400)
                  .json({ success: false, msg: "error in signup user" });
                return mysqlConnection.rollback(function (err) {
                  throw err;
                });
              }

              const token = await generateJWT(results_customer_login.insertId);

              results_customer_login.token = token;

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
                  data: results_customer_login,
                });
              });
            }
          );
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "general_error" + error });
  }
}

function rollbackAndRespond(
  res: Response,
  statusCode: number,
  message: string
) {
  mysqlConnection.rollback(function (err) {
    if (err) {
      console.error("Error rolling back transaction: ", err);
    }
    res.status(statusCode).json({ success: false, msg: message });
  });
}

export async function generateJWT(user = "", expiresAt = 0) {
  const payload = user;

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
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, msg: "no token" });
  }

  // token = token.split(" ")[1];

  verify(token, process.env.SECRET_KEY, function (err, data) {
    if (err) {
      return res.status(401).json("invalid_token");
    }
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

    const customerLoginId = verify(token, process.env.SECRET_KEY);

    const query_ = `SELECT Customers.CustomerID, Customers.Contact_Name, Customers.Company, Customers.Phone, Customers.Address, 
    Customers.State, Customers.ZipCode, Customers.Billing_Address, Customers.Billing_State, Customers.Billing_ZipCode, Customers.Billing_City,
    Customers.City, Customers.Company_Position, Customer_Login.Username, Customer_Login.Customer_LoginID,
    Customer_Login.Password FROM Customers
    LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Customers.CustomerID
    WHERE Customer_Login.Customer_LoginID = "${customerLoginId}"`;

    mysqlConnection.query(query_, function (err, results) {
      if (!results?.length) {
        return res.status(400).json({ success: false, msg: "User not found" });
      }

      return res.status(200).json({ success: true, data: results[0] });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: "General error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const {
    fullName,
    email,
    password,
    phone,
    state,
    zipCode,
    address,
    company,
    companyPosition,
    city,
    billingAddress,
    billingState,
    billingCity,
    billingZipCode,
  } = req.body;

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, msg: "no token" });
    }

    const customerLoginId = verify(token, process.env.SECRET_KEY);

    const _query = `SELECT CustomerID FROM Customer_Login WHERE Customer_LoginID = "${customerLoginId}"`;

    const updateColumnsAuth = [];
    if (email) updateColumnsAuth.push(`Username = "${email}"`);
    if (password) updateColumnsAuth.push(`Password = "${password}"`);
    const updateColumnsAuthString = updateColumnsAuth.join(", ");

    const updateColumnsCustomers = [];

    if (fullName) updateColumnsCustomers.push(`Contact_Name = "${fullName}"`);
    if (company) updateColumnsCustomers.push(`Company = "${company}"`);
    if (companyPosition)
      updateColumnsCustomers.push(`Company_Position = "${companyPosition}"`);
    if (phone) updateColumnsCustomers.push(`Phone = "${phone}"`);
    if (state) updateColumnsCustomers.push(`State = "${state}"`);
    if (address) updateColumnsCustomers.push(`Address = "${address}"`);
    if (zipCode) updateColumnsCustomers.push(`ZipCode = "${zipCode}"`);
    if (city) updateColumnsCustomers.push(`City = "${city}"`);
    if (billingAddress)
      updateColumnsCustomers.push(`Billing_Address = "${billingAddress}"`);
    if (billingState)
      updateColumnsCustomers.push(`Billing_State = "${billingState}"`);
    if (billingCity)
      updateColumnsCustomers.push(`Billing_City = "${billingCity}"`);
    if (billingZipCode)
      updateColumnsCustomers.push(`Billing_ZipCode = "${billingZipCode}"`);

    const updateColumnsCustomersString = updateColumnsCustomers.join(", ");

    mysqlConnection.query(_query, function (err, results) {
      if (!results.length) {
        return res
          .status(400)
          .json({ success: false, data: "Error in get user" });
      }

      const customerId = results[0].CustomerID;

      if (updateColumnsAuthString.length > 0) {
        const _query1 = `UPDATE Customer_Login SET ${updateColumnsAuthString} WHERE CustomerID = ${customerId}`;

        mysqlConnection.query(_query1, function (err, results) {
          if (err) {
            return res
              .status(400)
              .json({ success: false, data: "Error in update user auth" });
          }
        });
      }

      if (updateColumnsCustomersString.length > 0) {
        const _query2 = `UPDATE Customers SET ${updateColumnsCustomersString} WHERE CustomerID = "${customerId}"`;

        mysqlConnection.query(_query2, function (err, results) {
          if (err) {
            console.log("err", err);
            return res
              .status(400)
              .json({ success: false, data: "error in update user customer" });
          }
        });
      }

      return res
        .status(200)
        .json({ success: true, data: "Update user successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "General error" });
  }
}

export async function generateResetToken(req: Request, res: Response) {
  const { email } = req.body;

  try {
    mysqlConnection.beginTransaction(function (err: MysqlError) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "Error in mysql transaction" });
      }

      const verifyUserQuery = `SELECT * FROM Customer_Login WHERE Username = "${email}"`;

      mysqlConnection.query(
        verifyUserQuery,
        function (err: MysqlError, result: RowDataPacket) {
          if (err) {
            return res
              .status(400)
              .json({ success: false, msg: "Email not found" });
          }

          const customerId = result[0].CustomerID;

          if (!result.length) {
            return res
              .status(400)
              .json({ success: false, msg: "Email not found" });
          }

          const resetToken = aleatoryNumber(100000, 999999);

          const resetTokenDate = tokenDate();

          const postTokenUserQuery = `UPDATE Customer_Login SET Reset_Token_Date = ${resetTokenDate}, Reset_Token = ${resetToken}
          WHERE CustomerID = ${customerId}`;
          mysqlConnection.query(
            postTokenUserQuery,
            function (err: MysqlError, result: RowDataPacket) {
              if (err) {
                res
                  .status(400)
                  .json({ success: false, msg: "Error in set reset token" });
                return mysqlConnection.rollback(function (err) {
                  throw err;
                });
              }

              mysqlConnection.commit(function (err) {
                if (err) {
                  res.status(400).json({
                    success: false,
                    msg: "Error in commit transaction reset token",
                  });
                }
                sendEmailUser(resetToken, email);

                return res.status(200).json({
                  success: true,
                  msg: "Token sent to email successfully",
                });
              });
            }
          );
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "General error" });
  }
}

export async function validateResetToken(req: Request, res: Response) {
  const { token } = req.params;
  const { email } = req.body;

  try {
    const getResetTokenQuery = `SELECT * FROM Customer_Login WHERE Username = "${email}"`;

    mysqlConnection.query(
      getResetTokenQuery,
      function (err: MysqlError, result: RowDataPacket) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "Error in get reset token" });
        }

        const resetTokenDateBD = result[0].Reset_Token_Date;
        const resetTokenBD = result[0].Reset_Token;

        const dateNow = Date.now();

        if (token !== resetTokenBD || dateNow > resetTokenDateBD) {
          return res
            .status(400)
            .json({ success: false, msg: "Token invalid or expired" });
        }

        return res
          .status(200)
          .json({ success: true, msg: "Token get successful" });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, msg: "General error" });
  }
}

export async function changePassword(req: Request, res: Response) {
  const { newPassword, email } = req.body;
  try {
    const searchPasswordQuery = `SELECT * FROM Customer_Login WHERE Username = "${email}"`;

    mysqlConnection.query(
      searchPasswordQuery,
      function (err: MysqlError, result: RowDataPacket) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "User not valid" });
        }

        const oldPassword = result[0].Password;

        if (oldPassword === newPassword) {
          return res.status(400).json({
            success: false,
            msg: "Please choose a different password ",
          });
        }

        const changePasswordQuery = `UPDATE Customer_Login SET Password = "${newPassword}" WHERE Username = "${email}"`;

        mysqlConnection.query(
          changePasswordQuery,
          function (err: MysqlError, result: RowDataPacket) {
            if (err) {
              return res
                .status(400)
                .json({ success: false, msg: "Error in change password" });
            }

            return res
              .status(200)
              .json({ success: true, msg: "Password change successful" });
          }
        );
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "General error", error });
  }
}
