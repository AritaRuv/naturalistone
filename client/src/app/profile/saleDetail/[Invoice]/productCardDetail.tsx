import React from "react";
import { Box, Text, useMediaQuery, Center } from "@chakra-ui/react";
import NextImage from "next/image";
import { DetailProdSolds } from "@/utils/types";

const ProductCardDetail: React.FC<{
  product: DetailProdSolds;
}> = ({ product }) => {
  const {
    Finish,
    Material,
    Naturali_ProdName,
    Quantity,
    SalePrice,
    Size,
    Thickness,
    Type,
  } = product;

  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`;

  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isExtraExtraSmallScreen] = useMediaQuery("(max-width: 400px)");

  const fontSubTitle = isExtraExtraSmallScreen ? "0.6rem" : "0.7rem";
  const fontTitle = isExtraExtraSmallScreen ? "0.7rem" : "0.9rem";

  const price = Number(SalePrice);

  return (
    <>
      <Box
        h={"175px"}
        w={isExtraSmallScreen ? "100%" : "400px"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        px={"5px"}
        py={"4px"}
      >
        {isExtraSmallScreen ? (
          <Box
            h={"110px"}
            w={"110px"}
            position={"relative"}
            overflow={"hidden"}
          >
            <NextImage objectFit="cover" fill src={URL} alt="img" />
          </Box>
        ) : (
          <Box position="relative" display={"flex"} alignContent={"center"}>
            <Box
              h="140px"
              w="140px"
              position={"relative"}
              overflow={"hidden"}
              zIndex="0"
            >
              <NextImage objectFit="cover" src={URL} alt="Imagen" fill />
            </Box>
          </Box>
        )}

        <Box
          h={isExtraSmallScreen ? "120px" : "140px"}
          w={"220px"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Box>
            <Text textTransform={"uppercase"} fontSize={fontSubTitle}>
              {Material}
            </Text>
            <Text
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={fontTitle}
            >
              {Naturali_ProdName}
            </Text>
            <Text
              textTransform={"uppercase"}
              fontSize={"0.6rem"}
              color={"gray.600"}
            >
              {Finish} - {Size} - {Thickness}-{Type}
            </Text>
          </Box>
          <Box>
            <Box
              display={"flex"}
              h={"28px"}
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"70%"}
            >
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>
                Price sqf
              </Text>
              <Center w={"80px"}>
                <Text textTransform={"uppercase"} fontSize={"0.8rem"}>
                  ${price}
                </Text>
              </Center>
            </Box>
            <Box
              display={"flex"}
              h={"28px"}
              w={"70%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>
                Quantity
              </Text>
              <Center
                w={"80px"}
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                justifyItems={"flex-end"}
              >
                <Text>{Quantity}</Text>
              </Center>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCardDetail;
