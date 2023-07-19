"use client";
import { SimpleGrid, Checkbox, CheckboxGroup, Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";

const MaterialFilter: React.FC = () => {
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchMaterials())
  },[])

  return (
    <SimpleGrid
      spacingY={6}
      py={"1%"}
      px={ "5%"}
      w={"100%"}
      placeItems={"center"}
      columns={7} 
      h={'22vh'}
      pt={'6vh'}
      bg={"white"}
      alignItems={'flex-start'}
      position={'fixed'}
    >
        {
          materials.map(mat => {
            return(
            <Box key={mat} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-start'} w={'200px'}>
                <Text mr={'5px'} textTransform={'uppercase'}  fontSize={'0.9rem'}>{mat}</Text>
                <Box display={'flex'} alignItems={'center'} h={'20px'}>
                <Checkbox
                  colorScheme='whiteAlpha'
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  //isChecked={selectedFinish.includes(finish)}
                  //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                />
                </Box>
                
            </Box>)
          })
        }
    </SimpleGrid>
  );
};

export default MaterialFilter;

