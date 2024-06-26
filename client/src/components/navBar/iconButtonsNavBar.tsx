"use client";
import { Box, IconButton } from "@chakra-ui/react";
import { PiHeartStraightThin } from "react-icons/pi";
import CartButton from "./cartButton";
import UserButton from "./userButton";
      
const IconButtonsNavBar: React.FC = () => {
    
  return(
    <Box minW={"50px"} zIndex={1}>
      <CartButton/>
      <UserButton/>
      <IconButton
        aria-label="Heart-icon"
        variant="unstyled"
        fontSize="2xl"
        icon={<PiHeartStraightThin />}
      />
    </Box>
  );
};

export default IconButtonsNavBar;