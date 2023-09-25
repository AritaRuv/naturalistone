"use client";
import { Box, Button, Center } from "@chakra-ui/react";
import { PropsLogIn } from "@/interfaces/login";

const Checkout: React.FC<PropsLogIn> = ({ smallerThan600, smallerThan1200, smallerThan1450 }) => {
  return (
    <>
      <Box
        display={"flex"}
        h={smallerThan600 ? "66vh" : smallerThan1200 ? "50vh" : "68vh"}
        maxH={smallerThan1200 ? "700px" : "600px"}
        w={smallerThan600 ? "100vw" : smallerThan1200 ? "38vw" : smallerThan1450 ? "26vw" : "22vw"}
        minW={"300px"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={"65vh"}
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
