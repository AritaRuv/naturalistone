import React from 'react';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../productCard/_productCard';

const HomeProductContainer: React.FC = () => {
  return (
    <SimpleGrid
      spacingY={2}
      py={'2%'}
      px={'4%'}
      minChildWidth={'160px'}
      border={'2px solid red'}
      w={'100vw'}
      placeItems={'center'}
    >
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
    </SimpleGrid>
  );
};

export default HomeProductContainer;
