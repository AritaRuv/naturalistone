"use client";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

  interface TextButtonsNavBarProps {
    menuVisible: boolean;
  }
      
const TextButtonsNavBar: React.FC<TextButtonsNavBarProps> = ({menuVisible}) => {


  return(
    <Box
      visibility={menuVisible ? "unset" : "hidden"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems="center"
      minW={"300px"}
      zIndex={1}
      w={"24%"}>
      <Button fontSize="0.9rem" variant="unstyled" className="customButton"> NEW PRODUCTS </Button>
      <Link href={"/products"}>
        <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PRODUCTS </Button>
      </Link>
      <Button fontSize="0.9rem" variant="unstyled" className="customButton"> SALE </Button>
    </Box>
  );
};

export default TextButtonsNavBar;