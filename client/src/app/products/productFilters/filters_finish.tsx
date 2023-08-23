"use client";
import { Checkbox, Box, Text, Tooltip } from "@chakra-ui/react";
import { UniqueFilter } from "./types";
import { useState } from "react";
import LoadMoreButton from "./loadMoreButton";

const FiltersFinish: React.FC<UniqueFilter> = ({ finish, handleCheckboxChange }) => {
  const [amount, setAmount] = useState(5);
  const top5finish = finish?.slice(0,amount);
  return (
    <>
      <Box h={"fit-content"}  my={"1vh"}>
        <Text justifySelf={"flex-start"} fontWeight={"semibold"} fontSize={"0.9rem"}>FINISH</Text>
        <Box justifySelf={"flex-start"} w={"90%"} display={"flex"} flexDir={"column"} mt={"2vh"}>
          {
            top5finish?.map(mat => {
              if(mat !== null){
                return(
                  <Box my={"2px"} key={mat} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                    <Tooltip label={mat} isDisabled={mat.length > 8 ? false : true}>
                      <Text mr={"10px"} textTransform={"uppercase"} fontWeight={"light"} fontSize={"0.8rem"}>{mat.length > 8 ? mat.slice(0,8)+"..." : mat}</Text>
                    </Tooltip>
                    <Box display={"flex"} alignItems={"center"} h={"20px"}>
                      <Checkbox
                        colorScheme='whiteAlpha'
                        iconColor="orange"
                        borderColor={"blackAlpha.400"}
                        //isChecked={selectedFinish.includes(finish)}
                        onChange={() => handleCheckboxChange("finish", mat)}
                      />
                    </Box>
                  </Box>);
              }

            })
          }
          {
            finish?.length && (
              amount < finish?.length && (
                <LoadMoreButton setAmount={setAmount} amount={amount}/>
              )
            )
          
          }
        </Box>
      </Box>
    </>
  );
};

export default FiltersFinish;
