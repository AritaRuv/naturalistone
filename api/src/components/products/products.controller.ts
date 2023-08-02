/* eslint-disable indent */
/* eslint-disable quotes */
import {  MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { productDimensions } from "../../controllers/productDimensions";
//import { productDimensionsCheckboxes } from "../../controllers/productDimensionsCheckboxes";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { material } = req.query;

    const query = `SELECT DISTINCT Products.ProdNameID, ProdNames.Material, ProdNames.Naturali_ProdName, ProdNames.ProdNameID,
                  Product_Colors.ColorID, Product_Colors.idColorProduct, Product_Colors.ProductID
                  FROM Products
                  LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
                  LEFT JOIN Product_Colors ON Product_Colors.ProductID = Products.ProdID
                  ${material ? `WHERE Material = "${material}"` : ``}
                  `;
    //                 ${
    //   colorId
    //     ? `${material ? "AND" : "WHERE"} ColorID = "${colorId}"`
    //     : ``
    // }
    // const query = `SELECT ProdNameID, Naturali_ProdName, Material
    //               FROM ProdNames
    //               ${material ? `WHERE Material = "${material}"` : ``}
    //                 `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /");
          res.status(404).json("No products");
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

export async function getProductsValuesByProdNameID(
  req: Request,
  res: Response
) {
  try {
    const prodNameID = req.params.id;

    const query = `
      SELECT
        Products.ProdID,
        Products.SalePrice,
        Products.DimensionID,
        Products.ProdNameID,
        ProdNames.Naturali_ProdName,
        Dimension.Finish,
        Dimension.Size,
        Dimension.Thickness
      FROM
        NaturaliStone.Products
      LEFT JOIN
        ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
      LEFT JOIN
        Dimension ON Dimension.DimensionID = Products.DimensionID
      WHERE
        Products.ProdNameID = ?;
    `;

    mysqlConnection.query(
      query,
      [prodNameID],
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /id/:id");
          res.status(404).json("No products");
        } else {
          console.log("Data OK");
          const transformedResults = productDimensions(results);
          res.status(200).json(transformedResults);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
//Ruta para obtener el productID de la tarjeta en funcion de su DimensionID y de su ProdNameID
export async function getProductByIDS(req: Request, res: Response) {
  try {
    const { ProdNameID, DimensionID } = req.query;

    const query = `SELECT * FROM NaturaliStone.Products where Products.ProdNameID = ${ProdNameID} AND Products.DimensionID = ${DimensionID};`;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /IDs");
          res.status(404).json("No products match this search");
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
//Ruta para obtener listado de todos los nombres de materiales sin repetir
export async function getAllMaterials(req: Request, res: Response) {
  try {
    const query = `SELECT GROUP_CONCAT(DISTINCT ProdNames.Material SEPARATOR ', ') AS Materials
                    FROM ProdNames;
                    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /material");
          res.status(404).json("No material");
        } else {
          const materialesRowData = results as RowDataPacket[]; // Convertir a tipo RowDataPacket[]
          const materialesString = materialesRowData.map(
            (row) => row.Materials
          )[0]; // Obtener la cadena de materiales
          const materialesArray = materialesString
            .split(", ")
            .map((material) => material.trim()); // Dividir la cadena y eliminar los espacios en blanco
          res.status(200).json(materialesArray);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getAllDimensionProperties(req: Request, res: Response) {
  try {
    const query = `
      SELECT 
        GROUP_CONCAT(DISTINCT Type SEPARATOR ', ') AS Types,
        GROUP_CONCAT(DISTINCT Size SEPARATOR ', ') AS Sizes,
        GROUP_CONCAT(DISTINCT Thickness SEPARATOR ', ') AS Thicknesses,
        GROUP_CONCAT(DISTINCT Finish SEPARATOR ', ') AS Finishes
      FROM Dimension;
    `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en getAllDimensionProperties");
          res.status(404).json("No data");
        } else {
          const propertiesRowData = results[0] as RowDataPacket;
          const dimensionProperties = {
            Type: propertiesRowData.Types.split(", ").map((type) => type.trim()),
            Size: propertiesRowData.Sizes.split(", ").map((size) => size.trim()),
            Thickness: propertiesRowData.Thicknesses.split(", ").map((thickness) => thickness.trim()),
            Finish: propertiesRowData.Finishes.split(", ").map((finish) => finish.trim()),
          };
          res.status(200).json(dimensionProperties);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}

export async function getProductsFilter(req: Request, res: Response) {
  try {
    const { material, type, finish, size, thickness } = req.query;

    let query = 'SELECT DISTINCT pn.Naturali_ProdName, pn.Material, pn.ProdNameID  FROM ProdNames pn';

    let whereClause = '';
    const filters: {
      material?: string | string[] ;
      type?: string | string[];
      finish?: string | string[];
      size?: string | string[];
      thickness?: string | string[];
    } = req.query;
    
    const splitValues = (value: string | string[] | undefined | any, separator: string): string[] => {
      if (Array.isArray(value)) {
        return value;
      }
      return value ? value.split(separator) : [];
    };
    const materialValues = splitValues(material, ',');
    if (materialValues.length > 0) {
      whereClause += ' AND pn.Material IN (?)';
      filters['material'] = materialValues;
    }

    const typeValues = splitValues(type, ',');
    if (typeValues.length > 0) {
      query += ' INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID';
      whereClause += ' AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE type IN (?))';
      filters['type'] = typeValues;
    }

    const finishValues = splitValues(finish, ',');
    if (finishValues.length > 0) {
      query += ' INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID';
      whereClause += ' AND p.dimensionID IN (SELECT DimensionID FROM Dimension WHERE finish IN (?))';
      filters['finish'] = finishValues;
    }

    const sizeValues = splitValues(size, ',');
    if (sizeValues.length > 0) {
      query += ' INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID';
      whereClause += ' AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE size IN (?))';
      filters['size'] = sizeValues;
    }
    const thicknessValues = splitValues(thickness, ',');
    if (thicknessValues.length > 0) {
      query += ' INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID';
      whereClause += ' AND p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Thickness IN (?))';
      filters['thickness'] = thicknessValues;
    }

    if (whereClause) {
      query += ' WHERE ' + whereClause.slice(5); // Removing the leading ' AND '
    }

    mysqlConnection.query(
      query,
      Object.values(filters).flatMap((value) => {
        if (Array.isArray(value)) {
          return value as string[]; // Convert ParsedQs[] to string[]
        } else if (typeof value === "string") {
          return [value]; // Convert the single value to an array with one element
        } else {
          return []; // Return an empty array if the value is undefined or not a string
        }
      }),
      (error: MysqlError | null, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error in productsRoutes.get /");
          res.status(404).json("No products filters");
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

export async function getCheckboxValidation(
  req: Request,
  res: Response
) {
  try {

    // //const prodNameID = req.params.id;
    // const finish = req.query.finish?.toString() || ''; // Ensure finish is of type string
    // const thickness = req.query.thickness?.toString() || ''; // Ensure thickness is of type string
    // const size = req.query.size?.toString() || ''; // Ensure size is of type string
    
    // const query = `
    //   SELECT
    //     Products.ProdID,
    //     Products.SalePrice,
    //     Products.DimensionID,
    //     Products.ProdNameID,
    //     ProdNames.Naturali_ProdName,
    //     Dimension.Finish,
    //     Dimension.Size,
    //     Dimension.Thickness
    //   FROM
    //     NaturaliStone.Products
    //   LEFT JOIN
    //     ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
    //   LEFT JOIN
    //     Dimension ON Dimension.DimensionID = Products.DimensionID
    //   WHERE
    //     Products.ProdNameID = ?;
    // `;

    // mysqlConnection.query(
    //   query,
    //   (error: MysqlError | null, results: RowDataPacket[],) => {
    //     if (error) {
    //       throw error;
    //     }
    //     if (results.length === 0) {
    //       console.log("Error en productsRoutes.get /id/:id");
    //       res.status(404).json("No products");
    //     } else {
    //       console.log("Data OK");
          
    //       const filteredProducts = productDimensionsCheckboxes(finish, size, thickness, results);
    //       const transformedResults = productDimensions(filteredProducts);  
    //       res.status(200).json(transformedResults);
    //     }
    //   }
    // );
  } catch (error) {
    res.status(409).send(error);
  }
}