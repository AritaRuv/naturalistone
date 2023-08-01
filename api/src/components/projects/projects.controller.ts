/* eslint-disable quotes */
import { FieldInfo, MysqlError } from "mysql";
import express, { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket, FieldPacket } from "mysql2";


export async function getProjectsByCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM Projects WHERE CustomerID = ${id};`
                    

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[], fields: FieldPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en projectRoutes.get /");
          res.status(404).json("No projects");
        } else {
          console.log("Data OK");
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
export async function postNewProject(req: Request, res: Response) {

  const { ProjectName, CustomerID, Shipping_State, Shipping_ZipCode, Shipping_City, Shipping_Address } = req.body

  try {
    const query = `INSERT INTO Projects (ProjectName, CustomerID, Shipping_State, Shipping_ZipCode, Shipping_City, Shipping_Address ) VALUES (?, ?, ?, ?, ?, ?)`
    const projectValues = [ProjectName, CustomerID, Shipping_State, Shipping_ZipCode, Shipping_City, Shipping_Address]
                    
    mysqlConnection.query(query, projectValues, (error: MysqlError, results: RowDataPacket[], insertFields: FieldInfo[]) => {
      if(error) throw error;
      if(results.length == 0) {
          console.log('Error en projectRoutes.post /create-project/:customerID')
          res.status(200).json([]);
      } else {
          console.log('Project created successfully')
          res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getProjectByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM Projects WHERE idProjects = ${id};`
                    

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket, fields: FieldPacket) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en projectRoutes.get /");
          res.status(404).json("No project");
        } else {
          console.log("Data OK");
          res.status(200).json(results[0]);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}