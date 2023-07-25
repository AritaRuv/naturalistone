"use client";
import { Checkbox, Box, Text, Tooltip } from "@chakra-ui/react";
import { UniqueFilter } from "./types";

const FiltersSize: React.FC<UniqueFilter> = ({ size, handleCheckboxChange }) => {

  return (
    <>
      <Text w={'90%'} justifySelf={'flex-end'} fontWeight={'bold'} fontSize={'1rem'}>SIZE</Text>
      <Box w={'80%'} justifySelf={'flex-end'} display={'flex'} flexDir={'column'}>
        {
          size?.slice(2,17).map(mat => {
            return(
              <Box key={mat} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
                <Tooltip label={mat} isDisabled={mat.length > 18 ? false : true}>
                  <Text mr={'10px'} textTransform={'uppercase'}  fontSize={'0.9rem'}>{mat.length > 18 ? mat.slice(0,15)+'...' : mat}</Text>
                </Tooltip>
                <Box display={'flex'} alignItems={'center'} h={'20px'}>
                <Checkbox
                  colorScheme='whiteAlpha'
                  iconColor="orange"
                  borderColor={'blackAlpha.400'}
                  //isChecked={selectedFinish.includes(finish)}
                  onChange={() => handleCheckboxChange("size", mat)}
                />
              </Box>
            </Box>)
          })
        }
      </Box>
    </>
  );
};

export default FiltersSize;
