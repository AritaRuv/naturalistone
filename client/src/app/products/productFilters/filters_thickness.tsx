"use client";
import { Checkbox, Box, Text, Tooltip } from "@chakra-ui/react";
import { UniqueFilter } from "../../../interfaces/filtersProducts";
import LoadMoreButton from "./loadMoreButton";
import { useState } from "react";

const FiltersThickness: React.FC<UniqueFilter> = ({ thickness, handleCheckboxChange }) => {
  const [amount, setAmount] = useState(5);
  const top5thickness = thickness?.slice(0,amount);
  return (
    <>
      <Box h={"fit-content"}  my={"1vh"}>
        <Text justifySelf={"flex-start"} fontWeight={"bold"} fontSize={"0.9rem"}>THICKNESS</Text>
        <Box justifySelf={"flex-start"} w={"90%"} display={"flex"} flexDir={"column"}  mt={"2vh"}>
          {
            top5thickness?.map(mat => {
              if(mat !== null) {
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
                        //isChecked={selectedFinish.includes(finish)}
                        onChange={() => handleCheckboxChange("thickness", mat)}
                      />
                    </Box>
                  </Box>);
              }
            })
          }
          {
            thickness?.length && (
              amount < thickness?.length && (
                <LoadMoreButton setAmount={setAmount} amount={amount}/>
              )
            )
          }
        </Box>
      </Box>
    </>
  );
};

export default FiltersThickness;