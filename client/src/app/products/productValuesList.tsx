import { Box, Radio, RadioGroup, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface ProductListProps {
  data: { size: string[], thickness: string[], finish: string[], prodNameID: number };
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {

  const { size, thickness, finish } = data;
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');

  const handleSizeChange = (selected: string) => {
    setSelectedSize(selected);
  };

  const handleThicknessChange = (selected: string) => {
    setSelectedThickness(selected);
  };

  const handleFinishChange = (selected: string) => {
    setSelectedFinish(selected);
  };

  return (
    <>
      <HStack align="start" spacing={4} w={'100%'} mb={'4%'}>

        <VStack align="start" w={'33%'} >
          <Text fontSize='0.8rem'>FINISH</Text>
          <RadioGroup value={selectedFinish} onChange={handleFinishChange}>
            {finish.map((finish) => (
              <Box fontSize={'0.75rem'} display={'flex'} w={'70px'} justifyContent={'space-between'} py={'2%'}>
                  {finish}
                <Radio variant={'checkbox'} key={finish} value={finish} colorScheme="orange"/>
              </Box>
            ))}
          </RadioGroup>
        </VStack>

        <VStack align="start" w={'33%'}>
          <Text fontSize='0.8rem'>SIZE</Text>
          <RadioGroup value={selectedSize} onChange={handleSizeChange}>
            {size.map((size) => (
              <Box fontSize={'0.75rem'} display={'flex'} w={'70px'} justifyContent={'space-between'} py={'2%'}>
                  {size}
                <Radio key={size} value={size} colorScheme="orange"/>
              </Box>
            ))}
          </RadioGroup>
        </VStack>

        <VStack align="start" w={'33%'}>
          <Text fontSize='0.8rem'>THICKNESS</Text>
          <RadioGroup value={selectedThickness} onChange={handleThicknessChange}>
            {thickness.map((thickness) => (
              <Box fontSize={'0.75rem'} display={'flex'} w={'70px'} justifyContent={'space-between'} py={'2%'}>
                  {thickness}
                <Radio key={thickness} value={thickness} colorScheme="orange"/>
              </Box>
            ))}
          </RadioGroup>
        </VStack>
      </HStack>

      <Button
        fontSize={'1rem'}
        fontWeight={'semibold'}
        variant={'unstyled'}
        _hover={{
          fontWeight: 'bold',
        }}
      >
        ADD TO CART
      </Button>
    </>
  );
};

export default ProductList;
