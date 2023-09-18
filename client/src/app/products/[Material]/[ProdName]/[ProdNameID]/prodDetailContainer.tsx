"use client";
import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import ProdDetailInformation from "./prodDetailInformation";
import ProdDetailCarousel from "./prodDetailCarrusel";

export default function ProdDetailContainer({params}) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  return (
    <Box w={"100%"} display={"flex"} flexDir={!smallerThan740 ? "row" : "column"} >
      <ProdDetailCarousel params={params}/>
      <ProdDetailInformation params={params}/>
    </Box> 
  );
}
