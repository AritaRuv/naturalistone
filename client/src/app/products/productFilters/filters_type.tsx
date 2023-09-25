"use client";
import { Checkbox, Box, Text, Tooltip } from "@chakra-ui/react";
import { UniqueFilter } from "../../../interfaces/filtersProducts";
import { useState } from "react";
import LoadMoreButton from "./loadMoreButton";

const FiltersType: React.FC<UniqueFilter> = ({ type, handleCheckboxChange }) => {
  const [amount, setAmount] = useState(5);
  const top5type = type?.slice(0,amount);
  return (
    <>
      <Box h={"fit-content"} my={"1vh"}>
        <Text justifySelf={"flex-start"} fontWeight={"semibold"} fontSize={"0.9rem"}>TYPE</Text>
        <Box justifySelf={"flex-start"} w={"90%"} display={"flex"} flexDir={"column"} mt={"2vh"}>
          {
            top5type?.map(mat => {
              if(mat !== null ){
                return(
                  <Box my={"2px"} key={mat} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                    <Tooltip label={mat} isDisabled={mat.length > 18 ? false : true}>
                      <Text mr={"10px"} textTransform={"uppercase"} fontWeight={"light"} fontSize={"0.8rem"}>{mat.length > 18 ? mat.slice(0,15)+"..." : mat}</Text>
                    </Tooltip>
                    <Box display={"flex"} alignItems={"center"} h={"20px"}>
                      <Checkbox
                        colorScheme='whiteAlpha'
                        iconColor="orange"
                        borderColor={"blackAlpha.400"}
                        onChange={() => handleCheckboxChange("type", mat)}
                      />
                    </Box>
                  </Box>);
              }
              {
                type?.length && (
                  amount < type?.length && (
                    <LoadMoreButton setAmount={setAmount} amount={amount}/>
                  )
                );
              
              }

            })
          }
        </Box>
      </Box>
    </>
  );
};

export default FiltersType;
