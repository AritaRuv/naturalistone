import React from "react";
import { Box } from "@chakra-ui/react";
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
      w={"260px"}
      h={"200px"}
      flexDir={"column"}
      position={"relative"}
      zIndex={12}
      bg={"whitesmoke"}
      p={"15px"}
    >
      <SampleProductList ProdNameID={ProdNameID} data={productValues}/>
    </Box>
  );
};

export default AddSampleProductToCart;
