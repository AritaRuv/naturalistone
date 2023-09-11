import { DetailProdSolds, Payments } from "@/utils/types";

export interface Sales {
  Naturali_Invoice: number;
  Value: number;
  ProjectID: number;
  InvoiceDate?: Date;
  EstDelivery_Date?: Date;
  SellerID?: number;
  ShippingMethod: string;
  ShipTo: string;
  Warehouse_Stamp?: number;
  Payment_Stamp?: number;
  Status: string;
  ModificationFlag?: string;
  LasInsertDate?: Date;
  Updated_Date?: Date;
  PaymentTerms?: string;
  P_O_No?: string;
}

export interface SalesByCustomer {
  CustomerID: number;
  Active: number;
  ProjectName: string;
  Naturali_Invoice: number;
  Value: number;
  ProjectID: number;
  InvoiceDate?: Date;
  EstDelivery_Date?: Date;
  SellerID: number;
  ShippingMethod: string;
  ShipTo: string;
  Warehouse_Stamp?: number;
  Payment_Stamp?: number;
  Status: string;
  ModificationFlag: string;
  LasInsertDate?: Date;
  Updated_Date: Date;
  PaymentTerms?: string;
  P_O_No?: string;
}

export interface SalesDetail {
  sale: Sales;
  payments: Payments[];
  prodSolds: DetailProdSolds[];
}

export interface SalesState {
  salesProject: Sales[];
  salesCustomer: SalesByCustomer[];
  salesDetail: SalesDetail | object;
}

export enum SalesActionsType {
  GET_SALES_BY_PROJECT = "GET_SALES_BY_PROJECT",
  GET_SALES_BY_CUSTOMER = "GET_SALES_BY_CUSTOMER",
  GET_SALES_DETAILS = "GET_SALES_DETAILS",
  CLEAN_SALES_DETAILS = "CLEAN_SALES_DETAILS",
}

export interface FetchSalesByProjectRequestAction {
  type: SalesActionsType.GET_SALES_BY_PROJECT;
  payload: Sales[];
}

export interface FetchSalesByCustomerRequestAction {
  type: SalesActionsType.GET_SALES_BY_CUSTOMER;
  payload: SalesByCustomer[];
}

export interface FetchSalesDetailsRequestAction {
  type: SalesActionsType.GET_SALES_DETAILS;
  payload: SalesDetail;
}

export interface CleanSalesDetailsRequestAction {
  type: SalesActionsType.CLEAN_SALES_DETAILS;
  payload: object;
}

export type SalesActions =
  | FetchSalesByProjectRequestAction
  | FetchSalesByCustomerRequestAction
  | FetchSalesDetailsRequestAction
  | CleanSalesDetailsRequestAction;
