"use client";
import { Box, IconButton } from "@chakra-ui/react";
import { PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import CartButton from "./cartButton";
      
  const IconButtonsNavBar: React.FC = () => {
    
    return(
      <Box minW={'50px'} zIndex={1}>
        <CartButton/>
        <IconButton
          aria-label="User-icon"
          variant="unstyled"
          fontSize="3xl"
          icon={<PiUserCircleThin />}
        />
        <IconButton
          aria-label="Heart-icon"
          variant="unstyled"
          fontSize="3xl"
          icon={<PiHeartStraightThin />}
        />
      </Box>
    )
  }

export default IconButtonsNavBar;