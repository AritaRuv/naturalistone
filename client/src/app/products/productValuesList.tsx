import { Box, Checkbox, CheckboxGroup, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postCart } from '@/store/cart/actionsCart';
import { fetchProductsValuesValidation } from '@/store/products/actionsProducts';
import { ProductState } from '@/store/products/typesProducts';


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

  const { size, thickness, finish, prodNameID } = data[ProdNameID];

  const { productValuesValidation } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedThickness, setSelectedThickness] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');

  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string>>, name:string) => {
    setState(prevState => prevState === value ? '' : value);
    if(name === 'finish'){
      dispatch(fetchProductsValuesValidation(value, selectedSize, selectedThickness, prodNameID))
    }
    if(name === 'size'){
      dispatch(fetchProductsValuesValidation(selectedFinish, value, selectedThickness, prodNameID))
    }
    if(name === 'thickness'){
      dispatch(fetchProductsValuesValidation(selectedFinish, selectedSize, value, prodNameID))
    }
  };
  // console.log({productValuesValidation})

  const handleAddToCart = async () => {
    const bodyCust = {
      size: selectedSize,
      thickness: selectedThickness,
      finish: selectedFinish,
      ProdNameID: ProdNameID,
      customerID: 1938
    };
  
    dispatch(postCart(bodyCust));
    setSelectedSize('')
    setSelectedThickness('')
    setSelectedFinish('')

    }
  
  return (
    <>
      <HStack align="start" spacing={4} w={'100%'} mb={'4%'}>

        <CheckboxGroup value={[selectedFinish]} colorScheme='whiteAlpha'>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>FINISH</Text>
            {finish.map(finish => (
              <Box key={finish} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {finish}
                <Checkbox
                  value={finish}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedFinish === finish}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinish, 'finish')}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={[selectedSize]}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>SIZE</Text>
            {size.map(size => (
              <Box key={size} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {size}
                <Checkbox
                  value={size}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedSize === size}
                  onChange={() => handleCheckboxChange(size, setSelectedSize, 'size')}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={[selectedThickness]}>
          <VStack align="start" w={'33%'}>
            <Text fontSize='0.8rem'>THICKNESS</Text>
            {thickness.map(thickness => (
              <Box key={thickness} fontSize={'0.75rem'} display={'flex'} justifyContent={'space-between'} w={'100%'}>
                {thickness}
                <Checkbox
                  value={thickness}
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  isChecked={selectedThickness === thickness}
                  onChange={() => handleCheckboxChange(thickness, setSelectedThickness, 'thickness')}
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
