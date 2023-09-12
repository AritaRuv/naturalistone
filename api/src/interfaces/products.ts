export interface RawProductHome {
    DimensionID: number,
    Type: string,
    Size: string,
    Thickness: string,
    Finish: string,
    ProdNameID: number,
    SalePrice: number,
    ProdID: number,
    Material: string,
    Naturali_ProdName: string,
    ColorID: number | null,
    idColorProduct: number | null,
    }

export interface ProductHome {
  ProdNameID: number,
  Material: string,
  Naturali_ProdName: string,
  }