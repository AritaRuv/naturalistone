import React from 'react';
import { Box, Popover, PopoverTrigger, PopoverContent, IconButton, Text, Button } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { PiCaretDownThin } from 'react-icons/pi'
import '../../assets/styleSheet.css';
import { Bowlby_One_SC } from 'next/font/google';

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
      <Popover isOpen={isDropdownOpen}>
        <PopoverTrigger>
          <Box
            w={'14vw'}
            h={'42vh'}
            minW={'200px'}
            position={'relative'}
            overflow={'hidden'}
            rounded={'md'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NextImage objectFit="cover" fill src={'https://naturalistone-images.s3.amazonaws.com/Limestone/Nuoro/Nuoro_0.jpg'} alt="img" />
            <Box
              display={'flex'}
              w={'14vw'}
              minW={'200px'}
              bg={'rgba(210, 210, 210, 0.3)'}
              h={'5vh'}
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
              aria-label={'Description'}/>
            </Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          rounded={'none'}
          border={'none'}
          position="relative"
          h={'8vh'}
          w={'14vw'}
          minW={'200px'}
          zIndex={10}
          mt={'-9vh'}
          className="custom-popover"
          bg={'rgba(210, 210, 210, 0.5)'}
        >
        <Box>
          {/* <Box>
          <Text>Material</Text>
          <Button variant={'unstyled'}>Nombre del producto</Button>
          </Box>
          <Box>
          <Button variant={'unstyled'}>ORDER SAMPLE</Button>
          <Button variant={'unstyled'}>ADD TO CART</Button>
          </Box> */}

        </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ProductCard;
