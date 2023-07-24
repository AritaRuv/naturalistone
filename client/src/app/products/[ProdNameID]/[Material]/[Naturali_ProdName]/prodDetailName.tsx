"use client";
import React from "react";
import {
  Box, Text, useMediaQuery
} from "@chakra-ui/react";

export default function ProdDetailName({ params }) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const { Material, Naturali_ProdName } = params;

  return (
    <>
      <Box  mt={'3%'} display={'flex'} flexDir={!smallerThan740 ? 'column' : 'row'}>
        <Text fontSize={'1.5rem'} ml={'10px'} fontWeight={'semibold'}>{decodeURIComponent(Naturali_ProdName)}</Text>
        <Text fontSize={!smallerThan740 ? '1.1rem' : '1.5rem'} ml={'8px'} fontWeight={'semibold'}>{Material}</Text>
      </Box>
    </>
  );
}