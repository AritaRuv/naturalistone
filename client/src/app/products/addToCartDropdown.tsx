import React from 'react';
import { Box } from '@chakra-ui/react';
import ProductList from './productValuesList';

interface AddProductToCartProps {
  ProdNameID: number;
  productValues:any 
}

const AddProductToCart: React.FC<AddProductToCartProps> = ({ProdNameID, productValues}) => {

  return (
    <Box display={'flex'} justifyContent={'space-between'} py={'2%'} px={'2%'} w={'260px'} h={'20vh'} bg={'white'} flexDir={'column'} >
      <ProductList data={productValues} ProdNameID={ProdNameID}/>
    </Box>
  );
};

export default AddProductToCart;

