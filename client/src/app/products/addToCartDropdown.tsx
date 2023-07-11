import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import ProductList from './productValuesList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsValues } from '@/store/products/actionsProducts';
import { ProductState } from '@/store/products/typesProducts';


interface AddProductToCartProps {
  ProdNameID: number; // Reemplaza "any" con el tipo correcto de ProdNameID
}

const AddProductToCart: React.FC<AddProductToCartProps> = ({ProdNameID}) => {

  const dispatch = useAppDispatch();
  const { productValues } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProductsValues({ProdNameID}))
  }, []);

  return (
    <Box display={'flex'} justifyContent={'space-between'} py={'2%'} px={'2%'} w={'260px'} h={'20vh'} bg={'white'} flexDir={'column'} >
      <ProductList productValues={productValues}/>
    </Box>
  );
};

export default AddProductToCart;

