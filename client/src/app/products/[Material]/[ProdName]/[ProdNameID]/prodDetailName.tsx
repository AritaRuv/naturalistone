"use client";
import React from "react";
import {
  Box, Text
} from "@chakra-ui/react";

export default function ProdDetailName({ params }) {


  const { Material, ProdName } = params;

  return (
    <>
      <Box>
        <Text fontSize={"1rem"} fontWeight={"thin"}>{Material.toUpperCase()}</Text>
        <Text fontSize={"2.5rem"} fontWeight={"hairline"}>{decodeURIComponent(ProdName).toUpperCase()}</Text>
      </Box>
    </>
  );
}