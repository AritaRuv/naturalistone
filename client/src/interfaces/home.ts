export interface ProductsHomeFilterProps {
  colorId: string;
  material: string;
  materialValue?: string;
}

export interface FiltersHomeProps {
  setProductsFilter: React.Dispatch<
    React.SetStateAction<ProductsHomeFilterProps>
  >;
  productsFilter: ProductsHomeFilterProps;
}

export interface SectionProps {
  children: React.ReactNode;
}