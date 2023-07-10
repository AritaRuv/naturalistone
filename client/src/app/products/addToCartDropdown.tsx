import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import ProductList from './productValuesList';

const AddProductToCart: React.FC = () => {
  const data = {
    size: ['24 x 24', '48 x 48', '4 x 4'],
    thickness: ['1/2', '3/4', '12 mm', '24 mm'],
    finish: ['Matte', 'Glossy', 'Honed'],
    prodNameID: 1234,
  };

  return (
    <Box display={'flex'} justifyContent={'space-between'} py={'2%'} px={'2%'} w={'260px'} h={'20vh'} bg={'white'} flexDir={'column'} >
      <ProductList data={data}/>
    </Box>

  );
};

export default AddProductToCart;

