"use client";
import React from "react";
import {
  Box, Text, useMediaQuery
} from "@chakra-ui/react";

export default function ProdDetailName({ params }) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const { Material, ProdName } = params;

  return (
    <>
      <Box  mt={"3%"} display={"flex"} flexDir={"column"}>
        <Text fontSize={"1rem"} ml={"10px"} fontWeight={"normal"}>{Material.toUpperCase()}</Text>
        <Text fontSize={"1.5rem"} ml={"10px"} mb={"10px"} fontWeight={"semibold"}>{decodeURIComponent(ProdName).toUpperCase()}</Text>
      </Box>
    </>
  );
}