import React from "react";
import { Box } from "@chakra-ui/react";
import SampleProductList from "./sampleProductList";
import { AddProductToCartProps } from "@/interfaces/cart";



const AddSampleProductToCart: React.FC<AddProductToCartProps> = ({
  ProdNameID,
  productValues,
}) => {


  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      py={"2%"}
      px={"2%"}
      w={"260px"}
      h={"20vh"}
      bg={"white"}
      flexDir={"column"}
    >
      <SampleProductList ProdNameID={ProdNameID} data={productValues}/>
    </Box>
  );
};

export default AddSampleProductToCart;
