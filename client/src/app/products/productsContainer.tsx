"use client";
import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../products/_productCard";
import { fetchProducts } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface ComponentsProps {
  productsFilter: {
    color: string;
    material: string;
  };
}

const ProductsContainer: React.FC<ComponentsProps> = ({
  productsFilter,
}) => {
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 550px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 1000px)");
  const [is1200Screen] = useMediaQuery("(max-width: 1200px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1400px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1600px)");

  const dispatch = useAppDispatch();
  const { material, color } = productsFilter;

  const { products, loading, error } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
    
  let gridColumns = 5;
  
  if(isLargeScreen ){
    gridColumns = 4
  }
  if(isMediumScreen ){
    gridColumns = 3
  }
  if (isSmallScreen) {
    gridColumns = 2
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }

  useEffect(() => {
    dispatch(fetchProducts(material));
  }, [material]);

  return (
    <SimpleGrid
      zIndex={1}
      position={'fixed'}
      left={!is1200Screen ? '15vw' : 0}
      top={!is1200Screen ? '26vh' :'15vh'}
      spacingY={6}
      py={"2%"}
      w={is1200Screen ? '100vw' :'85vw'}
      placeItems={"center"}
      columns={gridColumns} // Establece el número de columnas dinámicamente
      h={'100%'}
      overflow={'auto'}

    >
      {products.length &&
        products.map((prod) => {
          return <ProductCard product={prod} key={prod.ProdNameID} site={'products'} />;
        })}
    </SimpleGrid>
  );
};

export default ProductsContainer;
