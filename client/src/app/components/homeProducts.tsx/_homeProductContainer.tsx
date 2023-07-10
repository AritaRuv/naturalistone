import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import ProductCard from '../productCard/_productCard';
import { fetchProducts } from "../../../store/actions";
import { ProductState } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

const HomeProductContainer: React.FC = () => {

  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch: ThunkDispatch<ProductState, any, AnyAction> = useDispatch();

  const { products, loading, error } = useSelector((state: { productReducer: ProductState }) => state.productReducer);
  
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
