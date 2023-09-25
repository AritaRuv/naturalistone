"use client";
import { Box, Center } from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";

const HomeIntExt = () => {

  const material = "Porcelain";
  const URL = `https://naturalistone-images.s3.amazonaws.com/${material}/0.jpeg`;

  return (
    <Center w={"100%"} h={"100vh"} bg={"site.lightBg"}>
      <Link href={`/products/${material}`}>
        <Center w={"400px"} h={"500px"} position={"relative"} overflow={"hidden"}>
          <NextImage style={{objectFit:"cover"}} fill sizes="(max-width: 260px)"  src={URL} alt="img" />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.3)"
          />
          {/* <Text
            color={"white"}
            fontSize={"1.5rem"}
            fontWeight={"thin"}
            position={"relative"}
            textTransform={"uppercase"}
          >
            {material}
          </Text> */}
        </Center>
      </Link>
      
    </Center>
  );
};

export default HomeIntExt;
