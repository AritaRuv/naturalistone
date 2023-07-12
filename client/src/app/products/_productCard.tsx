import React from 'react';
import { Box, IconButton, Button, Text, Center } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { PiCaretDownThin } from 'react-icons/pi';
import '../assets/styleSheet.css';
import { Product } from '@/store/products/typesProducts';
import AddProducttoCart from './addToCartDropdown';
import AddProductToCart from './addToCartDropdown';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disableBox, setDisableBox] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);

  const { Naturali_ProdName, Material, ProdNameID  } = product
  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setDisableBox(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setDisableBox(false);
    setShowAddToCart(false)
  };

  const handleAddToCart = () => {
    setShowAddToCart(true);
  };

  return (
    <Box position="relative">
      <Box
        w={'260px'}
        h={'370px'}
        position={'relative'}
        overflow={'hidden'}
        rounded={'md'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NextImage objectFit="cover" fill src={URL} alt="img" />
        <Box
          display={'flex'}
          w={'260px'}
          bg={'rgba(210, 210, 210, 0.5)'}
          h={'40px'}
          position={'absolute'}
          bottom={0}
          left={0}
          hidden={disableBox}
          placeContent={'center'}
        >
          <IconButton
            display={'flex'}
            placeContent={'center'}
            icon={<PiCaretDownThin/>}
            variant={'unstyled'}
            size={'lg'}
            maxH={'30px'}
            aria-label={'Description'}
          />
        </Box>
      </Box>
      <Box position="absolute" bottom={0} left={0} w={'100%'} zIndex={10}>
        {isDropdownOpen && (
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            position={'relative'}
            border={'none'}
            h={'90px'}
            w={'260px'}
            zIndex={10}
            className="custom-popover"
            bg={!showAddToCart ? 'rgba(210, 210, 210, 0.7)' : 'white'}
            borderBottomEndRadius={'md'}
            borderBottomStartRadius={'md'}
          >
            <Box pt={'2%'}>
              <Center mt={'5%'} flexDir={'column'} h={'40px'}>
                <Text fontSize={'0.6rem'} textTransform={'uppercase'}>
                  {Material}
                </Text>
                <Button variant={'unstyled'} textTransform={'uppercase'} fontSize={'0.9rem'}>
                  {Naturali_ProdName}
                </Button>
              </Center>
              { !showAddToCart ?
              <Box display={'flex'} justifyContent={'space-between'} px={'8%'}>
                <Button
                  fontSize={'0.6rem'}
                  fontWeight={'light'}
                  variant={'unstyled'}
                  _hover={{
                    fontWeight: 'semibold',
                  }}
                >
                  ORDER SAMPLE
                </Button>
                <Button
                  fontSize={'0.6rem'}
                  fontWeight={'light'}
                  variant={'unstyled'}
                  _hover={{
                    fontWeight: 'semibold',
                  }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </Box>
              :
              <AddProductToCart ProdNameID={ProdNameID}/>
              }
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;

