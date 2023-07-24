import React from "react";
import { Box, Text } from "@chakra-ui/react";
import SampleProductList from "./sampleProductList";


interface AddProductSampleToCartProps {
  ProdNameID: number;
  productValues: any;
}

const AddSampleProductToCart: React.FC<AddProductSampleToCartProps> = ({
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
