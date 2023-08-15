export interface EmailNaturali {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ErrorsProfile {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  zipCode?: string;
}

export interface ErrorsProject {
  ProjectName?: string;
  Shipping_Address?: string;
  Shipping_State?: string;
  Shipping_City?: string;
  Shipping_ZipCode?: string;
}

export interface Payments {
  idPayments: number;
  InvoiceID: number;
  Amount: string;
  Method: string;
  Date: Date;
  by?: string;
}

export interface DetailProdSolds {
  ProdNameID?: number;
  ProdID: number;
  Quantity: number;
  SalePrice: number;
  Naturali_ProdName: string;
  Material: string;
  Status: string;
}
