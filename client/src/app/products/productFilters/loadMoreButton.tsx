"use client";
import { Button } from "@chakra-ui/react";
import { PiCaretDownThin } from "react-icons/pi";



const LoadMoreButton = ({setAmount, amount}) => {
  return (
    <Button
      mt={"1vh"} 
      textTransform={"uppercase"} 
      fontWeight={"light"}  
      fontSize={"0.7rem"} 
      variant={"unstyled"} 
      display={"flex"}
      onClick={()=>setAmount(amount + 5)} 
      rightIcon={<PiCaretDownThin fontSize={"1.2rem"}/>}
      _hover={{
        fontWeight: "semibold",
      }}
    >load MORE</Button>
  );
};

export default LoadMoreButton;