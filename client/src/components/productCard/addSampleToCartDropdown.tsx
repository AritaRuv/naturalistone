import React from "react";
import { Box } from "@chakra-ui/react";
import SampleProductList from "./sampleProductList";
import { Product } from "@/store/products/typesProducts";

interface AddProductSampleToCartProps {
  ProdNameID: number;
  productValues: any;
  product?: Product;
}

const AddSampleProductToCart: React.FC<AddProductSampleToCartProps> = ({
  ProdNameID,
  productValues,
  product,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      w={"260px"}
      h={"200px"}
      flexDir={"column"}
      position={"relative"}
      zIndex={12}
      bg={"whitesmoke"}
      p={"15px"}
    >
      <SampleProductList
        ProdNameID={ProdNameID}
        data={productValues}
        product={product}
      />
    </Box>
  );
};

export default AddSampleProductToCart;
