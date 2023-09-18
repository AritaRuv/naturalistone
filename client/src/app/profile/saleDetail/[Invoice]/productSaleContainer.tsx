"use client";
import { Box, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCardDetail from "./productCardDetail";

export default function ProductsSaleContainer({ salesDetail }) {
  const [isSmallThan950] = useMediaQuery("(max-width: 950px)");
  const [isSmallThan1225] = useMediaQuery("(max-width: 1225px)");

  return (
    <>
      <Box w={"75vw"} h={"65vh"} overflow={"auto"} p={"20px"}>
        <SimpleGrid
          justifyItems="center"
          spacingY={"20px"}
          rounded={"sm"}
          columns={isSmallThan950 ? 1 : isSmallThan1225 ? 2 : 3}
        >
          {salesDetail.prodSolds.length !== 0 &&
            salesDetail.prodSolds.map((product) => {
              return <ProductCardDetail product={product} />;
            })}
        </SimpleGrid>
      </Box>
    </>
  );
}
