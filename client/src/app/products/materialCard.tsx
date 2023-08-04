"use client";
import { Text, Center, Box } from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";

export default function MaterialCard({ material }) {

  const URL = `https://naturalistone-images.s3.amazonaws.com/${material}/0.jpeg`;

  return (
    <>
      <Link href={`/products/${material}`}>
        <Center w={"350px"} h={"350px"} position={"relative"} overflow={"hidden"}>
          <NextImage objectFit="cover" fill src={URL} alt="img" />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.4)"
          />
          <Text
            color={"white"}
            fontSize={"1.5rem"}
            fontWeight={"thin"}
            position={"relative"}
            textTransform={"uppercase"}
          >
            {material}
          </Text>
        </Center>
      </Link>
    </>
  );
}
