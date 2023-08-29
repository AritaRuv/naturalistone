"use client";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import DetailMenu from "./detailMenu";

export default function Details({ params }) {
  const [focus, setFocus] = useState("details");

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        mb={"5vh"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <DetailMenu params={params} focus={focus} setFocus={setFocus} />
      </Box>
    </>
  );
}
