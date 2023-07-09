import React from 'react';
import { Box, Popover, PopoverTrigger, PopoverContent, IconButton, Button, Text, Center } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { PiCaretDownThin } from 'react-icons/pi';
import '../../assets/styleSheet.css';

const ProductCard: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disableBox, setDisableBox] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setDisableBox(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setDisableBox(false);
  };

  return (
    <Box position="relative">
      <Box
        w={'200px'}
        h={'350px'}
        position={'relative'}
        overflow={'hidden'}
        rounded={'md'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NextImage objectFit="cover" fill src={'https://naturalistone-images.s3.amazonaws.com/Limestone/Nuoro/Nuoro_0.jpg'} alt="img" />
        <Box
          display={'flex'}
          w={'200px'}
          bg={'rgba(210, 210, 210, 0.3)'}
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
            h={'100px'}
            w={'200px'}
            zIndex={10}
            className="custom-popover"
            bg={'rgba(210, 210, 210, 0.5)'}
            borderBottomEndRadius={'md'}
            borderBottomStartRadius={'md'}
          >
            <Box pt={'2%'} px={'2%'}>
              <Center mt={'5%'} flexDir={'column'} h={'50px'}>
                <Text fontSize={'0.6rem'}>MATERIAL</Text>
                <Button variant={'unstyled'} fontSize={'0.9rem'}>NOMBRE DEL PRODUCTO</Button>
              </Center>
              <Box display={'flex'} justifyContent={'space-between'} p={'3%'}>
                <Button
                  fontSize={'0.6rem'}
                  fontWeight={'light'}
                  variant={'unstyled'}
                  _hover={{
                    fontWeight: 'semibold'
                  }}
                >
                  ORDER SAMPLE
                </Button>
                <Button
                  fontSize={'0.6rem'}
                  fontWeight={'light'}
                  variant={'unstyled'}
                  _hover={{
                    fontWeight: 'semibold'
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;

