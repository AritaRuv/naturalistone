"use client";
import { Box, IconButton } from "@chakra-ui/react";
import { PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import CartButton from "./cartButton";
import Link from "next/link";
      
  const IconButtonsNavBar: React.FC = () => {
    
    return(
      <Box minW={'50px'} zIndex={1}>
        <CartButton/>
        <Link href={'/profile'}>
          <IconButton
            aria-label="User-icon"
            variant="unstyled"
            fontSize="3xl"
            icon={<PiUserCircleThin />}
            />
        </Link>
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