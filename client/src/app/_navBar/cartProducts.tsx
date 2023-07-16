import React from 'react';
import { Box, Button, Text, useMediaQuery } from '@chakra-ui/react';
import NextImage from 'next/image';
import '../assets/styleSheet.css';
import { ProductCart } from '@/store/cart/typesCart';
import { type } from 'os';

const ProductCardCart: React.FC<{ product: ProductCart }> = ({ product }) => {

  const { CustomerID, Finish, Material, Naturali_ProdName, Quantity, SalePrice, Size, Thickness, Type, idCartEntry  } = product
  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isExtraExtraSmallScreen] = useMediaQuery("(max-width: 400px)");

  const fontSubTitle = isExtraExtraSmallScreen ? '0.7rem' : '0.9rem'
  const fontTitle = isExtraExtraSmallScreen ? '0.9rem' : '1.2rem'

  return (
    <>
      <Box
        h={'175px'}
        w={isExtraSmallScreen ? '100%' :'440px'}
        overflow={'hidden'}
        rounded={'md'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-around'}
        px={'4%'}
        py={'6%'}
      >
        {
          isExtraSmallScreen ? (
            <Box h={'120px'} w={'100px'} position={'relative'} overflow={'hidden'} rounded={'md'}>
              <NextImage objectFit="cover" fill src={URL} alt="img" />
            </Box>
          ):(
            <Box h={'150px'} w={'150px'} position={'relative'} overflow={'hidden'} rounded={'md'}>
              <NextImage objectFit="cover" fill src={URL} alt="img" />
            </Box>
          )
        }

        <Box h={isExtraSmallScreen?'100px':'150px'} display={'flex'} flexDir={'column'} justifyContent={'space-between'}>
          <Box>
            <Text textTransform={'uppercase'} fontSize={fontSubTitle}>{Material}</Text>
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={fontTitle}>{Naturali_ProdName}</Text>
            <Text textTransform={'uppercase'} fontSize={'0.8rem'} color={'gray.600'}>{Finish} - {Size} - {Thickness}-{Type}</Text>
          </Box>
          <Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={fontSubTitle}>Price</Text>
            <Text textTransform={'uppercase'} fontSize={fontSubTitle}>${SalePrice}</Text>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text textTransform={'uppercase'} fontSize={fontSubTitle}>Quantity</Text>
            <Box display={'flex'} flexDir={'row'} alignItems={'center'} justifyItems={'space-between'}>
              <Button variant={'unstyled'} size={'xs'}>-</Button>
              <Text textTransform={'uppercase'} fontSize={fontSubTitle}>{Quantity}</Text>
              <Button variant={'unstyled'} size={'xs'}>+</Button>
            </Box>
          </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCardCart;

