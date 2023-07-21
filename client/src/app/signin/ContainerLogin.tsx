"use client";
import {
  SimpleGrid,
  Checkbox,
  CheckboxGroup,
  Box,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import Login from "./Login";
import Checkout from "./checkout";
import Register from "./register";
import Footer from "./footer";

const ContainerLogin: React.FC = () => {
  const [isActive600, setIsActive600] = useState(false);
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
          <Register
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