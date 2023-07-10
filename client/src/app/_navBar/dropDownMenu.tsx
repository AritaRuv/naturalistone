"use client";
import { Box, Button, Flex } from "@chakra-ui/react";

  interface DropDownMenuProps {
    handleHome: () => void;
  }

  const DropDownMenu: React.FC<DropDownMenuProps> = ({handleHome}) => {
    
    return(
      <Box display={'flex'} justifyContent={'flex-end'} px={'4%'}>
        <Flex w={'56%'} justifyContent="space-between"  minW={'500px'}>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton" onClick={handleHome}> HOME </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> ABOUT US </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PROJECTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PRODUCTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> SHOWS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> OUR TEAM </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> CONTACT </Button>
        </Flex>
    </Box>
    )
  }

    export default DropDownMenu;