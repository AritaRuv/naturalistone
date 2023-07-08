import React from 'react';
import { Box, Popover, PopoverTrigger, PopoverContent, IconButton, Button, Text, Center } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { PiCaretDownThin } from 'react-icons/pi'
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
      <Popover isOpen={isDropdownOpen}>
        <PopoverTrigger>
          <Box
            w={'14vw'}
            h={'42vh'}
            minW={'200px'}
            minH={'350px'}
            maxH={'400px'}
            position={'relative'}
            overflow={'hidden'}
            rounded={'md'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NextImage objectFit="cover" fill src={'https://naturalistone-images.s3.amazonaws.com/Limestone/Nuoro/Nuoro_0.jpg'} alt="img" />
            <Box
              border={'2px solid red'}
              display={'flex'}
              w={'14vw'}
              minW={'200px'}
              bg={'rgba(210, 210, 210, 0.3)'}
              h={'5vh'}
              //maxH={}
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
          h={'106px'}
          minH={'40px'}
          w={'14vw'}
          minW={'200px'}
          zIndex={10}
          mt={'-13vh'}
          className="custom-popover"
          bg={'rgba(210, 210, 210, 0.5)'}
          borderBottomEndRadius={'md'}
          borderBottomStartRadius={'md'}
        >
        <Box pt={'6%'} px={'2%'}>
          <Center flexDir={'column'} h={'5vh'}>
          <Text fontSize={'0.6rem'}>MATERIAL</Text>
          <Button variant={'unstyled'} fontSize={'0.9rem'}>NOMBRE DEL PRODUCTO</Button>
          </Center>
          <Box display={'flex'} justifyContent={'space-between'} p={'3%'} >
          <Button 
          fontSize={'0.6rem'} 
          fontWeight={'light'} 
          variant={'unstyled'}
          _hover={{
            fontWeight: 'semibold'
          }}>ORDER SAMPLE</Button>
          <Button 
          fontSize={'0.6rem'}  
          fontWeight={'light'} 
          variant={'unstyled'}
          _hover={{
            fontWeight: 'semibold'
          }}>ADD TO CART</Button>
          </Box>

        </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ProductCard;
