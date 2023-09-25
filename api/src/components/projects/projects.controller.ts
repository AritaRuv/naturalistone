import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { verify } from "jsonwebtoken";

export async function getProjectsByCustomer(req: Request, res: Response) {
  try {

    const token = req.headers.authorization;

    if(!token) return res.status(200).json({ success: false, results: "no token" });
    const customerLoginId = verify(token, process.env.SECRET_KEY);

    const query = `SELECT
                        Projects.*
                      FROM Projects
                      LEFT JOIN Customer_Login ON Customer_Login.CustomerID = Projects.CustomerID
                      WHERE Customer_Login.Customer_LoginID = ${customerLoginId} 
                      AND Active = 1;`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("No projects for that curstomer");
          res.status(200).json({ success: false, results: "No projects for that curstomer" });
        } else {
          console.log("Data OK");
          res.status(200).json({ success: true, results: results });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function postNewProject(req: Request, res: Response) {

  
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ success: false, results: "no token" });

    const customerLoginId = verify(token, process.env.SECRET_KEY);

    // Consulta para obtener el CustomerID asociado al Customer_LoginID
    const queryCustomer = `
      SELECT CustomerID
      FROM Customer_Login
      WHERE Customer_LoginID = ?
    `;

    mysqlConnection.query(
      queryCustomer,
      [customerLoginId],
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          return res.status(400).json({
            success: false,
            msg: "Error in create project",
            err: error,
          });
        }

        const CustomerID = results[0]?.CustomerID;
        if (!CustomerID) {
          return res.status(404).json({ success: false, msg: "Customer not found" });
        }
        const {
          ProjectName,
          Shipping_State,
          Shipping_ZipCode,
          Shipping_City,
          Shipping_Address,
        } = req.body;

        const query = "INSERT INTO Projects (ProjectName, CustomerID, Shipping_State, Shipping_ZipCode, Shipping_City, Shipping_Address ) VALUES (?, ?, ?, ?, ?, ?)";
        const projectValues = [
          ProjectName,
          CustomerID,
          Shipping_State,
          Shipping_ZipCode,
          Shipping_City,
          Shipping_Address,
        ];

        mysqlConnection.query(
          query,
          projectValues,
          (
            error: MysqlError,
            results: RowDataPacket[],
          ) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                msg: "Error in create project",
                err: error,
              });
            }
            if (results.length == 0) {
              console.log(
                "Error en projectRoutes.post /create-project"
              );
              res
                .status(200)
                .json({ success: false, msg: "Error in create project", data: [] });
            } else {
              console.log("Project created successfully");
              res.status(200).json({
                success: true,
                msg: "Create project successfully",
                data: results,
              });
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getProjectByID(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;

    if (!token){
      console.log("No token");
      return res.status(400).json({ success: false, results: "no token" });
    } 
    const customerLoginId = verify(token, process.env.SECRET_KEY);
    if (!customerLoginId) return res.status(400).json({ success: false, results: "no token" });
    
    const { id } = req.params;
    const query = `SELECT * FROM Projects WHERE idProjects = ${id} AND Active = 1`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket) => {
        if (error) {
          console.log(error);
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en projectRoutes.get /");
          res.status(200).json("No project");
        } else {
          console.log("Data OK");
          res.status(200).json({ success: true, results: results[0] });
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function updateProject(req: Request, res: Response) {
  const {
    ProjectName,
    Shipping_Address,
    Shipping_State,
    Shipping_City,
    Shipping_ZipCode,
  } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ success: false, results: "no token" });
  const customerLoginId = verify(token, process.env.SECRET_KEY);
  if (!customerLoginId) return res.status(400).json({ success: false, results: "no token" });
  
  const { id } = req.params;

  try {
    const updateColumnsProject = [];

    if (ProjectName)
      updateColumnsProject.push(`ProjectName = "${ProjectName}"`);
    if (Shipping_Address)
      updateColumnsProject.push(`Shipping_Address = "${Shipping_Address}"`);
    if (Shipping_State)
      updateColumnsProject.push(`Shipping_State = "${Shipping_State}"`);
    if (Shipping_City)
      updateColumnsProject.push(`Shipping_City = "${Shipping_City}"`);
    if (Shipping_ZipCode)
      updateColumnsProject.push(`Shipping_ZipCode = "${Shipping_ZipCode}"`);

    const updateColumnsProjectString = updateColumnsProject.join(", ");

    const _query = `UPDATE Projects SET ${updateColumnsProjectString} WHERE idProjects = ${id}`;

    mysqlConnection.query(
      _query,
      function (err: MysqlError, results: RowDataPacket[]) {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "Error in update project" });
        }

        return res
          .status(200)
          .json({ success: true, msg: "Project update successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, msg: "General error in update Projects" });
  }
}

export async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ success: false, results: "no token" });
  const customerLoginId = verify(token, process.env.SECRET_KEY);
  if (!customerLoginId) return res.status(400).json({ success: false, results: "no token" });
  
  try {
    const _query = `UPDATE Projects SET Active = "0" WHERE idProjects = ${id}`;

    mysqlConnection.query(
      _query,
      function (err: MysqlError, results: RowDataPacket[]) {
        if (err) {
          return res
            .status(404)
            .json({ success: false, msg: "Error in delete project" });
        }
        return res
          .status(200)
          .json({ success: true, msg: "Delete project successful" });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, msg: "General error" });
  }
}
