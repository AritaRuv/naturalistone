'use client'
import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import ProductCard from './_productCard';
import { fetchProducts } from "../../store/actions";
import { ProductState } from "../../store/types";
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const HomeProductContainer: React.FC = () => {

  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);
  
  const homeProducts = products.slice(0,4)
  console.log(homeProducts)

  let gridColumns = 4;
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }
  
  useEffect(() => {
      dispatch(fetchProducts())
  }, []);

  return (
    <SimpleGrid
      spacingY={6}
      py={'2%'}
      px={'10%'}
      w={'100vw'}
      placeItems={'center'}
      columns={gridColumns} // Establece el número de columnas dinámicamente
      bg={'#f2f2f2'}
     >
      {
        homeProducts.length && (
          homeProducts.map(prod => {
            return(
              <ProductCard product={prod} key={prod.ProdNameID} />
            )
          })
        )
      }
    </SimpleGrid>
  );
};

export default HomeProductContainer;
