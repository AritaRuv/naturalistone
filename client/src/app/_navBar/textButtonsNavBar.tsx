"use client";
import { Box, Button } from "@chakra-ui/react";

  interface TextButtonsNavBarProps {
    menuVisible: boolean;
  }
      
  const TextButtonsNavBar: React.FC<TextButtonsNavBarProps> = ({menuVisible}) => {


    return(
      <Box
        visibility={menuVisible ? 'unset' : 'hidden'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems="center"
        minW={'300px'}
        zIndex={1}
        w={'24%'}>
        <Button fontSize="0.9rem" variant="unstyled" className="customButton"> NEW PRODUCTS </Button>
        <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PRODUCTS </Button>
        <Button fontSize="0.9rem" variant="unstyled" className="customButton"> SALE </Button>
    </Box>
    )
  }

export default TextButtonsNavBar;