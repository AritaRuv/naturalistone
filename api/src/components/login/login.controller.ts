import mysqlConnection from "../../db";
import { Response, Request } from "express";

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    mysqlConnection.beginTransaction(function (err) {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: "error in post /register" });
      }

      const _query = `INSERT INTO Customers (Company, Email) Values("${username}", "${email}")`;

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

        console.log("soy restuls222222", results);

        const _query1 = `INSERT INTO Customer_Login (CustomerID, Username, Password) Values ("${customerId}", "${email}", "${password}")`;

        mysqlConnection.query(_query1, function (err, results, fields) {
          console.log("soy results3", results);
          if (err) {
            res
              .status(400)
              .json({ success: false, msg: "error in register user" });
            return mysqlConnection.rollback(function (err) {
              throw err;
            });
          }

          console.log("soy result44444", results);

          return mysqlConnection.commit(function (err) {
            if (err) {
              res
                .status(500)
                .json({ success: false, msg: "failed to register user" });
              return mysqlConnection.rollback(function () {
                throw err;
              });
            }

            console.log("Transaction committed successfully");

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
