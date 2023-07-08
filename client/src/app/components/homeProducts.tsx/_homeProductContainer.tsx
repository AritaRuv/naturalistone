import React from 'react';
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import ProductCard from '../productCard/_productCard';

const HomeProductContainer: React.FC = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 900px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");

  let gridColumns = 4;
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }

  return (
    <SimpleGrid
      spacingY={6}
      py={'2%'}
      px={'4%'}
      w={'100vw'}
      placeItems={'center'}
      columns={gridColumns} // Establece el número de columnas dinámicamente
      bg={'#f2f2f2'}
     >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </SimpleGrid>
  );
};

export default HomeProductContainer;
