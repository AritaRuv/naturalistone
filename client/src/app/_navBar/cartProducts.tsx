import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { PiCaretDownThin } from 'react-icons/pi';
import '../assets/styleSheet.css';
import { ProductCart } from './cartButton';

const ProductCardCart: React.FC<{ product: ProductCart }> = ({ product }) => {
  const { material, product_name, price, quantity } = product
  const URL = `https://naturalistone-images.s3.amazonaws.com/${material}/${product_name}/${product_name}_0.jpg`
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
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>{material}</Text>
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={'1.2rem'}>{product_name}</Text>
          </Box>
          <Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>Price</Text>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>${price}</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>Quantity</Text>
            <Text textTransform={'uppercase'} fontSize={'0.9rem'}>{quantity}</Text>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCardCart;

