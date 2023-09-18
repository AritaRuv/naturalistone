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
  idPayments?: number;
  InvoiceID: number;
  Amount: number;
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
  Type: string;
  Size: string;
  Thickness: string;
  Finish: string;
}

interface ShippingAddress {
  FirstName: string;
  LastName: string;
  Company: string;
  Email: string;
  Shipping_Address: string;
  Shipping_City: string;
  Shipping_State: string;
  Shipping_ZipCode: string;
  Phone: string;
}

interface PaymentMethod {
  Method: string;
  CreditCardNumber: string;
  ExpirationDateMonth: string;
  ExpirationDateYear: string;
  Cvv: string;
}

export interface CheckoutFormData {
  Shipping_Address: ShippingAddress;
  Shipping_Method: string;
  Payment_Method: PaymentMethod;
  SubTotal: string;
  Shipping_Total: string;
  Total: string;
}

export interface IProductCart {
  size: string;
  thickness: string;
  finish: string;
  ProdNameID: number;
  customerID: number;
}
