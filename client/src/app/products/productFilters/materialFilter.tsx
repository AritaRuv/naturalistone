"use client";
import { SimpleGrid, Checkbox, Box, Text, Tooltip, CheckboxGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { FiltersState } from "./types";

const MaterialFilter: React.FC<FiltersState> = ({filters, setFilters, handleCheckboxChange}) => {
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchMaterials())
  },[])

  return (
    <SimpleGrid
      h={'20vh'}
      spacingY={4}
      py={"1%"}
      w={"100%"}
      columns={7} 
      pt={'6vh'}
      bg={"white"}
      position={'fixed'}
      alignItems={'flex-start'}
      display={'grid'}
      flexDir={'row'}
    >
        {
          materials.map(mat => {
            return(
            <Box key={mat} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-start'} w={'170px'}>
                <Tooltip label={mat} isDisabled={mat.length > 15 ? false : true}>
                  <Text mr={'10px'} textTransform={'uppercase'}  fontSize={'0.9rem'}>{mat.length > 15 ? mat.slice(0,13)+'...' : mat}</Text>
                </Tooltip>
                <Box display={'flex'} alignItems={'center'} h={'20px'}>
                <Checkbox
                  colorScheme='whiteAlpha'
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  onChange={() => handleCheckboxChange("materials", mat)}
                />
                </Box>
                
            </Box>)
          })
        }
    </SimpleGrid>
  );
};

export default MaterialFilter;

