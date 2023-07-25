"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

  interface DropDownMenuProps {
    handleHome: () => void;
    active: boolean;
  }

  const DropDownMenu: React.FC<DropDownMenuProps> = ({handleHome, active}) => {
    
    return(
      <Box display={'flex'} justifyContent={'flex-end'} px={'4%'} zIndex={1} bg={active ? "white" : "none"} position={'absolute'} top={'6vh'} left={0} right={0}>
        <Flex w={'56%'} justifyContent="space-between"  minW={'500px'}>
          <Link href={'/home'}>
            <Button fontSize="0.9rem" variant="unstyled" className="customButton" onClick={handleHome}> HOME </Button>
          </Link>
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