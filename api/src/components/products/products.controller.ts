import { MysqlError } from "mysql";
import { Request, Response } from "express";
import mysqlConnection from "../../db";
import { RowDataPacket } from "mysql2";
import { productDimensions } from "../../controllers/productDimensions";
import { compareValues } from "../../utils/orderThickness";
import { sortedFractions } from "../../utils/orderFractionsThickness";
import getProductsByProdName from "../../controllers/homeProducts";
//import { productDimensionsCheckboxes } from "../../controllers/productDimensionsCheckboxes";


export async function getHomeProducts(req: Request, res: Response) {
  try {
    const { material, colorId } = req.query;

    const query = `
              SELECT DISTINCT Dimension.DimensionID, Dimension.Type, Dimension.Size, Dimension.Thickness,
              Dimension.Finish, Products.ProdNameID, Products.SalePrice, Products.ProdID, ProdNames.Material, ProdNames.Naturali_ProdName, 
              ProdNames.ProdNameID, Product_Colors.ColorID, Product_Colors.idColorProduct FROM Products
              LEFT JOIN ProdNames ON ProdNames.ProdNameID = Products.ProdNameID
              LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
              LEFT JOIN Product_Colors ON ProdNames.ProdNameID = Product_Colors.ProdNameID
              ${material ? `WHERE ProdNames.Material = "${material}"` : ""}
              ${ colorId ? `${material ? "AND" : "WHERE"} ColorID = "${colorId}"` : ""
} `;

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
          console.log("Products Home OK");
          const parsedProds = getProductsByProdName(results);
          res.status(200).json(parsedProds);
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
    const query = `SELECT -- Products.ProdID, Naturali_ProdName, ProdNames.Material, Dimension.*, Quantity 
                  ProdNames.Material, count(*) Sale_count
                  from ProdSold inner join Products on Products.ProdID = ProdSold.ProdID
                  inner join ProdNames on ProdNames.ProdNameID = Products.ProdNameID
                  inner join Dimension on Dimension.DimensionID = Products.DimensionID
                  -- where saleID = 4013
                  group by ProdNames.Material
                  order by count(*) desc
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
          const materialsFilters = materialesRowData
            .filter((products) => products.Material !== null)
            .map((productFilters) => productFilters.Material);
          res.status(200).json(materialsFilters);
        }
      }
    );
  } catch (error) {
    res.status(409).send(error);
  }
}
//Ruta para obtener listado de dimensiones de todos los productos filtrados por material ordenados del mas utilizado al menos
export async function getAllDimensionProperties(req: Request, res: Response) {
  const { material } = req.params;

  try {
    const frequencyQuery = `
      SELECT Type AS Value, COUNT(Type) AS Frequency
      FROM Dimension D
      JOIN Products P ON D.DimensionID = P.DimensionID
      JOIN ProdNames PN ON P.ProdNameID = PN.ProdNameID
      ${
  material === "all"
    ? "WHERE NOT D.Type = \"Sample\""
    : `WHERE PN.Material = "${material}" AND NOT D.Type = "Sample"`
}
      GROUP BY Type
      ORDER BY Frequency DESC;
    `;

    const properties = ["Type", "Size", "Thickness", "Finish"];
    const dimensionProperties: Record<string, string[]> = {};

    for (const property of properties) {
      mysqlConnection.query(
        frequencyQuery.replace(/Type/g, property),
        (error: MysqlError, results: RowDataPacket[]) => {
          if (error) {
            throw error;
          }
          const propertyRowData = results as RowDataPacket[];
          dimensionProperties[property] = propertyRowData.map(
            (row) => row.Value
          );

          if (property === "Finish") {
            dimensionProperties.Type = dimensionProperties?.Type.filter(
              (el) =>
                el !== null &&
                el !== "" &&
                el !== "null" &&
                el !== "undefined" &&
                el !== undefined
            ).sort();
            const filterDimensionSize = dimensionProperties.Size.filter(
              (el) =>
                el !== null &&
                el !== "" &&
                el !== "null" &&
                el !== "undefined" &&
                el !== undefined &&
                el !== "0"
            );
            dimensionProperties.Size = filterDimensionSize.sort(compareValues);
            dimensionProperties.Finish = dimensionProperties?.Finish.filter(
              (el) =>
                el !== null &&
                el !== "" &&
                el !== "null" &&
                el !== "undefined" &&
                el !== undefined
            ).sort();
            const filterDimensionThickness =
              dimensionProperties.Thickness.filter(
                (el) =>
                  el !== null &&
                  el !== "" &&
                  el !== "null" &&
                  el !== "undefined" &&
                  el !== undefined
              );
            dimensionProperties.Thickness = sortedFractions(
              filterDimensionThickness
            );
            res.status(200).json(dimensionProperties);
          }
        }
      );
    }
  } catch (error) {
    res.status(409).send(error);
  }
}
//Ruta para obtener listado de todos productos filtrados por size, thickness, finish y type
export async function getProductsFilter(req: Request, res: Response) {
  try {
    const { material, type, finish, size, thickness } = req.query;

    let query =
      "SELECT DISTINCT pn.Naturali_ProdName, pn.Material, pn.ProdNameID FROM ProdNames pn INNER JOIN Products p ON pn.ProdNameID = p.ProdNameID";

    let whereClause = "";
    const filters: {
      material?: string | string[];
      type?: string | string[];
      finish?: string | string[];
      size?: string | string[];
      thickness?: string | string[];
    } = req.query;

    const splitValues = (
      value: string | string[] | undefined | any,
      separator: string
    ): string[] => {
      if (Array.isArray(value)) {
        return value;
      }
      return value ? value.split(separator) : [];
    };
    const materialValues = splitValues(material, ",");
    if (materialValues.length > 0) {
      whereClause += " AND pn.Material IN (?)";
      filters["material"] = materialValues;
    }

    let orClause = "";
    const typeValues = splitValues(type, ",");
    let markerTypes = "";
    typeValues.forEach((elemento, index) => {
      markerTypes += "?";
      if (index < typeValues.length - 1) {
        markerTypes += ", ";
      }
    });
    if (typeValues.length > 0) {
      orClause += ` OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Type IN (${markerTypes}))`;
      filters["type"] = typeValues;
    }

    const finishValues = splitValues(finish, ",");
    let markerFinish = "";
    finishValues.forEach((elemento, index) => {
      markerFinish += "?";
      if (index < finishValues.length - 1) {
        markerFinish += ", ";
      }
    });
    if (finishValues.length > 0) {
      orClause += ` OR p.dimensionID IN (SELECT DimensionID FROM Dimension WHERE  Dimension.Finish IN (${markerFinish}))`;
      filters["finish"] = finishValues;
    }

    const sizeValues = splitValues(size, ",");
    let markerSize = "";
    sizeValues.forEach((elemento, index) => {
      markerSize += "?";
      if (index < sizeValues.length - 1) {
        markerSize += ", ";
      }
    });
    if (sizeValues.length > 0) {
      orClause += ` OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE  Dimension.Size IN (${markerSize}))`;
      filters["size"] = sizeValues;
    }
    const thicknessValues = splitValues(thickness, ",");
    let markerThickness = "";
    thicknessValues.forEach((elemento, index) => {
      markerThickness += "?";
      if (index < thicknessValues.length - 1) {
        markerThickness += ", ";
      }
    });
    if (thicknessValues.length > 0) {
      orClause += `OR p.DimensionID IN (SELECT DimensionID FROM Dimension WHERE Dimension.Thickness IN (${markerThickness}))`;
      filters["thickness"] = thicknessValues;
    }

    if (orClause) {
      whereClause += " AND (" + orClause.slice(4) + ")"; // Removing the leading ' OR '
    }

    if (whereClause) {
      query += " WHERE " + whereClause.slice(5); // Removing the leading ' AND '
    }
    console.log(query);
    const obj = Object.values(filters).flatMap((value) => {
      if (Array.isArray(value)) {
        return value as string[]; // Convert ParsedQs[] to string[]
      } else if (typeof value === "string") {
        return [value]; // Convert the single value to an array with one element
      } else {
        return []; // Return an empty array if the value is undefined or not a string
      }
    });
    console.log(query);
    console.log(obj);
    mysqlConnection.query(
      query,
      Object.values(filters)
        .flatMap((value) => {
          if (Array.isArray(value)) {
            return value as string[]; // Convert ParsedQs[] to string[]
          } else if (typeof value === "string") {
            return [value]; // Convert the single value to an array with one element
          } else {
            return []; // Return an empty array if the value is undefined or not a string
          }
        })
        .flat(Infinity),
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

export async function getCheckboxValidation(req: Request, res: Response) {
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

export async function getAllProductsByMaterial(req: Request, res: Response) {
  try {
    const { material } = req.query;

    const query = `SELECT ProdNames.Material,
                          ProdNames.Naturali_ProdName, 
                          ProdNames.ProdNameID, 
                          Products.ProdID, 
                          Products.SalePrice, 
                          Dimension.Type, 
                          Dimension.Size, 
                          Dimension.Thickness, 
                          Dimension.Finish,
                          Products.SalePrice,
                          CASE
                            WHEN 
                              Dimension.Type = "Tile" AND ProdNames.Material != "Porcelain" 
                            THEN 
                              (SUBSTRING_INDEX(Dimension.Size, 'x', 1) * SUBSTRING_INDEX(Dimension.Size, 'x', -1)) / 144
                            ELSE
                              NULL
                          END AS sqft
                  FROM Products
                  LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                  LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                  WHERE (
                    (ProdNames.Material IN ("Porcelain", "Terrazzo"))
                    OR (ProdNames.Material NOT IN ("Porcelain", "Terrazzo") AND Dimension.Type != "Slab")
                    )
                  AND Products.Discontinued_Flag = "False"
                    ${material === "all" ? "" : `AND ProdNames.Material = "${material}"`}
                  ORDER BY ProdNames.Naturali_ProdName ASC
                  `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /materialfilterby");
          res.status(404).json(`No products with material ${material}`);
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

export async function getAllProducts(req: Request, res: Response) {
  try {
    const query = `SELECT ProdNames.Material,
                          ProdNames.Naturali_ProdName, 
                          ProdNames.ProdNameID, 
                          Products.ProdID, 
                          Products.SalePrice, 
                          Dimension.Type, 
                          Dimension.Size, 
                          Dimension.Thickness, 
                          Dimension.Finish,
                          Products.SalePrice, 
                          Colors.ColorName, 
                          CASE
                            WHEN 
                              Dimension.Type = "Tile" AND ProdNames.Material != "Porcelain" 
                            THEN 
                              (SUBSTRING_INDEX(Dimension.Size, 'x', 1) * SUBSTRING_INDEX(Dimension.Size, 'x', -1)) / 144
                            ELSE
                              NULL
                          END AS sqft
                  FROM Products
                  LEFT JOIN ProdNames ON Products.ProdNameID = ProdNames.ProdNameID
                  LEFT JOIN Dimension ON Products.DimensionID = Dimension.DimensionID
                  LEFT JOIN Product_Colors ON ProdNames.ProdNameID = Product_Colors.ProdNameID
                  LEFT JOIN Colors ON Product_Colors.ColorID = Colors.ColorID
                  WHERE (
                    (ProdNames.Material IN ("Porcelain", "Terrazzo"))
                    OR (ProdNames.Material NOT IN ("Porcelain", "Terrazzo") AND Dimension.Type != "Slab")
                    )
                  AND Products.Discontinued_Flag = "False"
                  ORDER BY ProdNames.Naturali_ProdName ASC
                  `;

    mysqlConnection.query(
      query,
      (error: MysqlError, results: RowDataPacket[]) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          console.log("Error en productsRoutes.get /allRawProducts");
          res.status(404).json("No products found");
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
