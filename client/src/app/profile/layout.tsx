"use client";
import { Box } from "@chakra-ui/react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box h={"93vh"} display={"flex"} flexDir={"column"} justifyContent={"flex-end"}>
      {children}
      <Box w={"100vw"} bg={"site.lightGrey"} h={"20vh"} position={"relative"}>

      </Box>
    </Box>
  );
}
