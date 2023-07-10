"use client";
import { Box, Button } from "@chakra-ui/react";

  interface MenuProps {
    handleMenu: () => void;
  }

  const Menu: React.FC<MenuProps> = ({handleMenu}) => {
    
    return(
      <Box minW={'30px'}>
        <Button fontSize="0.9rem" variant="unstyled" className="customButton" onClick={handleMenu}> MENU </Button>
      </Box>
    )
  }

    export default Menu;