import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { verify } from "jsonwebtoken";


export async function getAllFavorites(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;

    if(!token) {
      return res.status(200).json({ success: false, results: "no token" });
    }
    
    const customerLoginId = verify(token, process.env.SECRET_KEY);

    const query = ` SELECT DISTINCT
                      ProdNames.*, 
                      Project_ProdName.*, 
                      Projects.idProjects  
                    FROM Project_ProdName
                    LEFT JOIN ProdNames ON ProdNames.ProdNameID = Project_ProdName.ProdNameID
                    LEFT JOIN Projects ON Projects.idProjects = Project_ProdName.idProjects
                    LEFT JOIN Customers ON Projects.CustomerID = Customers.CustomerID
                    LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Projects.CustomerID
                    WHERE Customer_Login.Customer_LoginID = ${customerLoginId}
                  `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("No favorites");
          res.status(200).json({ success: false, results: [] });
        } else {
          console.log("favorite OK");
          res.status(200).json({ success: true, results: results });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getProjectFavorites(req: Request, res: Response) {
  try {
    const { idProjects } = req.params;
    const token = req.headers.authorization;

    if(!token) {
      return res.status(200).json({ success: false, results: "no token" });
    }
    
    const customerLoginId = verify(token, process.env.SECRET_KEY);
    if(!customerLoginId){
      return res.status(200).json({ success: false, results: "error in validate customer" });
    }
    const query = ` SELECT DISTINCT ProdNames.*, Project_ProdName.* from Project_ProdName
                    LEFT JOIN ProdNames ON ProdNames.ProdNameID = Project_ProdName.ProdNameID
                    LEFT JOIN Projects ON Projects.idProjects = Project_ProdName.idProjects
                    WHERE Projects.idProjects = ${idProjects}
                  `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en favortiesRoutes.get /");
          res.status(200).json(`No favorites in project ${idProjects}`);
        } else {
          console.log(`Favorites in project ${idProjects} OK`);
          res.status(200).json({ success: true, results: results });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function postFavoritesProductProject(req: Request, res: Response) {
  const { idproject, idprodname } = req.params;
  const token = req.headers.authorization;

  if(!token) {
    return res.status(200).json({ success: false, results: "no token" });
  }
  
  const customerLoginId = verify(token, process.env.SECRET_KEY);
  if(!customerLoginId){
    return res.status(200).json({ success: false, results: "error in validate customer" });
  }

  try {
    const querySelect =
      "SELECT * FROM Project_ProdName WHERE idProjects = ? AND ProdNameID = ?";
    const queryInsert =
      "INSERT INTO Project_ProdName (idProjects, ProdNameID) values (?, ?)";

    mysqlConnection.query(
      querySelect,
      [idproject, idprodname],
      function (err: MysqlError, results: RowDataPacket[]) {
        if (err) {
          return res.status(200).json({
            success: false,
            msg: "Error in checking if the product already exists in the project",
          });
        }

        if (results.length > 0) {
          return res.status(200).json({
            success: false,
            msg: "Product already exists in the project",
          });
        } else {
          mysqlConnection.query(
            queryInsert,
            [idproject, idprodname],
            function (err: MysqlError) {
              if (err) {
                return res.status(400).json({
                  success: false,
                  msg: "Error in inserting favorites product in project",
                });
              }

              return res.status(200).json({
                success: true,
                msg: "Insert product successful",
              });
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "General error in post favorites products in project",
    });
  }
}

export async function deleteFavoriteProductInProject(
  req: Request,
  res: Response
) {
  const { idprojects, prodnameid } = req.params;
  const token = req.headers.authorization;

  if(!token) {
    return res.status(200).json({ success: false, results: "no token" });
  }
  
  const customerLoginId = verify(token, process.env.SECRET_KEY);
  if(!customerLoginId){
    return res.status(200).json({ success: false, results: "error in validate customer" });
  }

  try {
    const queryDeleteProductInProject = `DELETE FROM Project_ProdName WHERE idProjects = ${idprojects} AND ProdNameID = ${prodnameid}`;

    mysqlConnection.query(queryDeleteProductInProject, function (err, results) {
      if (err) {
        console.log("error", err);
        return res.status(400).json({
          success: false,
          msg: "error in delete product in project favorites",
          data: results,
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Delete favorite product successful" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "General error" });
  }
}
