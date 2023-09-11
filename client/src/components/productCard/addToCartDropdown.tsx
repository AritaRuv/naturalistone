import React from "react";
import { Box } from "@chakra-ui/react";
import ProductList from "./productValuesList";
import { Product } from "@/store/products/typesProducts";

interface AddProductToCartProps {
  ProdNameID: number;
  productValues: any;
  product?: Product;
}

const AddProductToCart: React.FC<AddProductToCartProps> = ({
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
      <ProductList
        data={productValues}
        ProdNameID={ProdNameID}
        product={product}
      />
    </Box>
  );
};

export default AddProductToCart;
