export interface PropsNewProject {
    CustomerID: number;
    postProductProject?: boolean;
    ProdNameID?: number;
  }

export interface BodyProject {
    ProjectName: string;
    CustomerID?: number;
    Shipping_Address: string;
    Shipping_ZipCode: string;
    Shipping_State: string;
    Shipping_City: string;
  }