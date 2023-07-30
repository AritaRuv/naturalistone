/* eslint-disable indent */
/* eslint-disable quotes */
import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";

export async function getAllFavorites(req: Request, res: Response) {
  try {
    const { customer_id } = req.params;

    const query = ` SELECT DISTINCT ProdNames.* from Project_ProdName
                    LEFT JOIN ProdNames ON ProdNames.ProdNameID = Project_ProdName.ProdNameID
                    LEFT JOIN Projects ON Projects.idProjects = Project_ProdName.idProjects
                    LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
                    WHERE Customers.CustomerID = ${customer_id}
                  `;

    mysqlConnection.query(
      query, 
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en favortiesRoutes.get /");
          res.status(200).json("No favorites");
        } else {
          console.log("favorite OK");
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

