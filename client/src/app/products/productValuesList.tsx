import { Box, Checkbox, CheckboxGroup, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector,  } from '@/store/hooks';
import { fetchProduct } from '@/store/products/actionsProducts';
import { ProductState } from '@/store/products/typesProducts';
import { postCart } from '@/store/cart/actionsCart';

interface ProductListProps {
  data: {
    [key: string]: {
      size: string[];
      thickness: string[];
      finish: string[];
      prodNameID: number;
    };
  },
  ProdNameID: number
}

const ProductList: React.FC<ProductListProps> = ({ data, ProdNameID}) => {

  const dispatch = useAppDispatch();
  console.log({data})
  const { size, thickness, finish, prodNameID } = data[ProdNameID];

  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedThickness, setSelectedThickness] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prevState => prevState.includes(value) ? prevState.filter(v => v !== value) : [value]);
  }; 

  //maneja los checkboxes para controlar que solo 1 este clickeado a la vez

  const handleAddToCart = async () => {
    const bodyCust = {
      size: selectedSize[0],
      thickness: selectedThickness[0],
      finish: selectedFinish[0],
      ProdNameID: ProdNameID,
      customerID: 1938,
    };
  
    dispatch(postCart(bodyCust));
      //ahoramismo estoy intentando que la logica general funcione. Voy a necesitar agregar logica para controlar los chcekcbox
      // ya que en este momento admite convinaciones inexistentes. Al clickear 1 checkbox filtra los demas x resultados existentes 
      //o algo por el estilo. 
    }
  
  return (
    <>
      <HStack align="start" spacing={4} w={'100%'} mb={'4%'}>

        <CheckboxGroup value={selectedFinish} colorScheme='whiteAlpha'>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>FINISH</Text>
            {finish.map(finish => (
              <Box key={finish} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {finish}
                <Checkbox
                  value={finish}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedFinish.includes(finish)}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedSize}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>SIZE</Text>
            {size.map(size => (
              <Box key={size} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {size}
                <Checkbox
                  value={size}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedSize.includes(size)}
                  onChange={() => handleCheckboxChange(size, setSelectedSize)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedThickness}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>THICKNESS</Text>
            {thickness.map(thickness => (
              <Box key={thickness} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {thickness}
                <Checkbox
                  value={thickness}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedThickness.includes(thickness)}
                  onChange={() => handleCheckboxChange(thickness, setSelectedThickness)}
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
        }}
        onClick={handleAddToCart}>
        ADD TO CART
      </Button>
    </>
  );
};

export default ProductList;
