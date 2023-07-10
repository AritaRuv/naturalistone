"use client";
import { IconButton } from "@chakra-ui/react";
import { PiShoppingCartThin } from 'react-icons/pi';

  // interface CartButtonProps {
  //   handleMenu: () => void;
  // }

  const CartButton: React.FC = () => {
    
    return(
      <IconButton
      aria-label="Cart-icon"
      variant="unstyled"
      fontSize="3xl"
      icon={<PiShoppingCartThin />}
    />
    )
  }

    export default CartButton;