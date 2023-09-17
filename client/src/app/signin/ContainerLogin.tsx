"use client";
import {
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Checkout from "./checkout";
import SignUp from "./SignUp";
import Footer from "./footer";

const ContainerLogin: React.FC = () => {

  const [activeLogin, setActiveLogin] = useState(true);
  const [smallerThan600] = useMediaQuery("(max-width: 600px)");
  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan1450] = useMediaQuery("(max-width: 1450px)");

  return (
    <>
      <Box
        w={"full"}
        h={smallerThan600 ? "76vh" : smallerThan1200 ? "60vh" : "unset"}
        mt={smallerThan600 || smallerThan1200 ? "12vh" : "18vh"}
        display={"flex"}
        alignItems={smallerThan600 ? "center" : "flex-start"}
        justifyContent={"center"}
        flexDirection={smallerThan600 ? "column" : "row"}
      >
        {activeLogin ? (
          <Login
            setActiveLogin={setActiveLogin}
            smallerThan600={smallerThan600}
            smallerThan1200={smallerThan1200}
            smallerThan1450={smallerThan1450}

          />
        ) : (
          <SignUp
            setActiveLogin={setActiveLogin}
            smallerThan600={smallerThan600}
            smallerThan1200={smallerThan1200}
            smallerThan1450={smallerThan1450}

          />
        )}
        <Checkout
          setActiveLogin={setActiveLogin}
          smallerThan600={smallerThan600}
          smallerThan1200={smallerThan1200}
          smallerThan1450={smallerThan1450}
        />
        {smallerThan600 ? <Footer /> : <></>}
      </Box>
      {!smallerThan600 ? <Footer /> : <></>}
    </>
  );
};

export default ContainerLogin;
