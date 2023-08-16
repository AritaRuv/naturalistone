"use client";
import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import ProdDetailInformation from "./prodDetailInformation";
import ProdDetailCarousel from "./prodDetailCarrusel";
import ProdDetailName from "./prodDetailName";

export default function ProdDetailContainer({params}) {

  // const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  return (
    <Box w={"100%"} mt={"2%"} display={"flex"} flexDir={!smallerThan740 ? "row" : "column"} >
      {/* {
        smallerThan740 ? 
          <ProdDetailName params={params}/>
          : null
      } */}
      <ProdDetailCarousel params={params}/>
      <ProdDetailInformation params={params}/>
    </Box> 
  );
}
