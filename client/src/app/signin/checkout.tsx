"use client";
import { Box, Button, Center } from "@chakra-ui/react";
import { Props } from "./Login";

const Checkout: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  return (
    <>
      <Box
        display={"flex"}
        h={"68vh"}
        w={smallerThan600 ? "80%" : "35%"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={"54vh"}
          w={"full"}
          backgroundImage={
            "url(https://elegancetiles.com.au/wp-content/uploads/IMG_3315-1-1350x1013.jpg)"
          }
        ></Box>
        <Box
          display={"flex"}
          h={"14vh"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Center>
            <Button
              style={{
                border: "transparent",
                background: "transparent",
              }}
            >
              CHECKOUT NOW
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Checkout;
