export interface Sales {
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

export interface SalesState {
  salesProject: Sales[];
}

export enum SalesActionsType {
  GET_SALES_BY_PROJECT = "GET_SALES_BY_PROJECT",
}

export interface FetchSalesByProjectRequestAction {
  type: SalesActionsType.GET_SALES_BY_PROJECT;
  payload: Sales[];
}

export type SalesActions = FetchSalesByProjectRequestAction;
