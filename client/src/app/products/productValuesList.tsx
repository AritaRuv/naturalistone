import { Box, Checkbox, CheckboxGroup, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface ProductListProps {
  data: { size: string[], thickness: string[], finish: string[], prodNameID: number };
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {

  const { size, thickness, finish } = data;

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prevState => prevState.includes(value) ? prevState.filter(v => v !== value) : [value]);
  }; //maneja los checkboxes para controlar que solo 1 este clickeado a la vez

  return (
    <>
      <HStack align="start" spacing={4} w={'100%'} mb={'4%'}>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedFinishes}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>FINISH</Text>
            {finish.map(finish => (
              <Box key={finish} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {finish}
                <Checkbox
                  value={finish}
                  iconColor="orange"
                  isChecked={selectedFinishes.includes(finish)}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinishes)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedSizes}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>SIZE</Text>
            {size.map(size => (
              <Box key={size} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {size}
                <Checkbox
                  value={size}
                  iconColor="orange"
                  isChecked={selectedSizes.includes(size)}
                  onChange={() => handleCheckboxChange(size, setSelectedSizes)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedThicknesses}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>THICKNESS</Text>
            {thickness.map(thickness => (
              <Box key={thickness} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {thickness}
                <Checkbox
                  value={thickness}
                  iconColor="orange"
                  isChecked={selectedThicknesses.includes(thickness)}
                  onChange={() => handleCheckboxChange(thickness, setSelectedThicknesses)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
      </HStack>
      <Button
        fontSize={'1rem'}
        fontWeight={'semibold'}
        variant={'unstyled'}
        _hover={{
          fontWeight: 'bold',
        }}>
        ADD TO CART
      </Button>
    </>
  );
};

export default ProductList;
