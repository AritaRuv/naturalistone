"use client";
import { Checkbox, Box, Text, Tooltip } from "@chakra-ui/react";
import { UniqueFilter } from "../../../interfaces/filtersProducts";
import { useState } from "react";
import LoadMoreButton from "./loadMoreButton";

const FiltersSize: React.FC<UniqueFilter> = ({ size, handleCheckboxChange }) => {
  const [amount, setAmount] = useState(5);
  const top5sizes = size?.slice(0,amount);
  return (
    <>
      <Box h={"fit-content"}  my={"1vh"}>
        <Text justifySelf={"flex-start"} fontWeight={"bold"} fontSize={"0.9rem"}>SIZE</Text>
        <Box justifySelf={"flex-start"} w={"90%"} display={"flex"} flexDir={"column"} mt={"2vh"}>
          {
            top5sizes?.map(mat => {
              if(mat !== null ){
                return(
                  <Box 
                    my={"2px"} 
                    key={mat} 
                    display={"flex"} 
                    flexDir={"row"} 
                    justifyContent={"space-between"}
                  >
                    <Tooltip
                      label={mat} 
                      isDisabled={mat.length > 18 ? false : true}
                    >
                      <Text 
                        mr={"10px"} 
                        textTransform={"uppercase"} 
                        fontWeight={"light"}  
                        fontSize={"0.8rem"}
                      >
                        {mat.length > 18 ? mat.slice(0,15)+"..." : mat}
                      </Text>
                    </Tooltip>
                    <Box
                      display={"flex"} 
                      alignItems={"center"} 
                      h={"20px"}
                    >
                      <Checkbox
                        colorScheme='whiteAlpha'
                        iconColor="orange"
                        borderColor={"blackAlpha.400"}
                        //isChecked={selectedFinish.includes(finish)}
                        onChange={() => handleCheckboxChange("size", mat)}
                      />
                    </Box>
                  </Box>);
              }

            })
          }
          {
            size?.length && (
              amount < size?.length && (
                <LoadMoreButton setAmount={setAmount} amount={amount}/>
              )
            )
          }
        
        </Box>
      </Box>
    </>
  );
};

export default FiltersSize;
