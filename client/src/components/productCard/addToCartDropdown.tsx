import React from "react";
import { Box } from "@chakra-ui/react";
import ProductList from "./productValuesList";

interface AddProductToCartProps {
  ProdNameID: number;
  productValues: any;
}

const AddProductToCart: React.FC<AddProductToCartProps> = ({
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
      <ProductList data={productValues} ProdNameID={ProdNameID} />
    </Box>
  );
};

export default AddProductToCart;
