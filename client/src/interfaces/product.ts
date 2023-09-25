import { Product } from "@/store/products/typesProducts";

export interface ProductDetail {
  ProdID: number | null;
  Material: string; 
  Type: string;
  Size: string;
  Thickness: string;
  Finish: string;
  Quantity: number | null; 
  }

export interface ProductProject {
    postProductProject: boolean;
    idProjects: number;
    ProjectName: string;
  }

export interface ProductListProps {
    data: {
      [key: string]: {
        size: string[];
        thickness: string[];
        finish: string[];
        prodNameID: number;
      };
    };
    ProdNameID: number;
    product?: Product;
  }
