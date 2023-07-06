import React from 'react';
import { Box } from '@chakra-ui/react';
import NextImage from 'next/image'

const ProductCard: React.FC = () => {

  return (
    <Box
      border={'2px solid red'}
      w={'16vw'}
      h={'42vh'}
      minW={'160px'}
      >
          {/* <NextImage objectFit='contain' fill src={'https://naturalistone-images.s3.amazonaws.com/Limestone/Nuoro/Nuoro_0.jpg'} alt='img'/> */}
    </Box>
  );
};

export default ProductCard;
