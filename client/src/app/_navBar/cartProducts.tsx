import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import '../assets/styleSheet.css';
import { ProductCart } from '@/store/cart/typesCart';

const ProductCardCart: React.FC<{ product: ProductCart }> = ({ product }) => {

  const { CustomerID, Finish, Material, Naturali_ProdName, Quantity, SalePrice, Size, Thickness, Type, idCartEntry  } = product
  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`
  return (
    <>
      <Box
        h={'175px'}
        w={'450px'}
        overflow={'hidden'}
        rounded={'md'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-around'}
        px={'4%'}
        py={'6%'}
      >
        <Box h={'150px'} w={'150px'} position={'relative'} overflow={'hidden'} rounded={'md'}>
          <NextImage objectFit="cover" fill src={URL} alt="img" />
        </Box>
        <Box w={'50%'} h={'150px'} display={'flex'} flexDir={'column'} justifyContent={'space-between'}>
          <Box>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>{Material}</Text>
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={'1.2rem'}>{Naturali_ProdName}</Text>
            <Text>{Finish}{Size}{Thickness}</Text>
          </Box>
          <Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>Price</Text>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>${SalePrice}</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>Quantity</Text>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>{Quantity}</Text>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCardCart;

