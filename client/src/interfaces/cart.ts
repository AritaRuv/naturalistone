import { Product } from "@/store/products/typesProducts";

export interface AddProductToCartProps {
  productValues: any;
  ProdNameID: number;
  }

  
export interface AddProductSampleToCartProps {
    productValues: any;
    product?: Product;
    ProdNameID: number;
  }
  
export interface AddProductToCartProps {
    ProdNameID: number;
    productValues: any;
    product?: Product;
  }
  
export interface bodyCart {
    size: string | null;
    thickness: string;
    finish: string;
  ProdNameID: number;
  customerID: number;
  AddMore?: number;
  ToInvoice?: number;
}

export interface bodyCartUpdate {
  Quantity: number;
  idCartEntry: number;
  customerID: number;
  AddMore?:number;
  ToInvoice?:number;
}

export interface CartButtonProps {
  isCartModalOpen?: boolean;
  setIsCartModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sample?: boolean;
  icon?: boolean;
  }