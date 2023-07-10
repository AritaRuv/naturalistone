import { RowDataPacket } from "mysql2";

  export function productDimensions(array: RowDataPacket[]): { size: string[], thickness: string[], finish: string[], prodNameID: number } {
    const values: { size: string[], thickness: string[], finish: string[], prodNameID: number } = {
      size: [],
      thickness: [],
      finish: [],
      prodNameID: 0
    };
  
    array.forEach((producto) => {
      const { Size, Thickness, Finish, ProdNameID } = producto;
  
      if (Size !== null && !values.size.includes(Size)) {
        values.size.push(Size);
      }
  
      if (Thickness !== null && !values.thickness.includes(Thickness)) {
        values.thickness.push(Thickness);
      }
  
      if (Finish !== null && !values.finish.includes(Finish)) {
        values.finish.push(Finish);
      }
  
      values.prodNameID = ProdNameID;
    });
  
    return values ;
  }