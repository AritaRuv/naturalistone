"use client";
import { Box, Button } from "@chakra-ui/react";
import { MenuProps } from "@/interfaces/navbar";

const Menu: React.FC<MenuProps> = ({handleMenu}) => {
    
  return(
    <Box minW={"30px"} zIndex={1} >
      <Button fontSize="0.8rem" variant="unstyled" className="customButton" onClick={handleMenu}> MENU </Button>
    </Box>
  );
};

export default Menu;