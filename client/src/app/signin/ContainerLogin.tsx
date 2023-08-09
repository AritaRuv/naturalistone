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


  return (
    <>
      <Box
        h={"82vh"}
        w={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={smallerThan600 ? "column" : "row"}
      >
        {activeLogin ? (
          <Login
            setActiveLogin={setActiveLogin}
            smallerThan600={smallerThan600}
          />
        ) : (
          <SignUp
            setActiveLogin={setActiveLogin}
            smallerThan600={smallerThan600}
          />
        )}
        <Checkout
          setActiveLogin={setActiveLogin}
          smallerThan600={smallerThan600}
        />
        {smallerThan600 ? <Footer /> : <></>}
      </Box>
      {!smallerThan600 ? <Footer /> : <></>}
    </>
  );
};

export default ContainerLogin;
