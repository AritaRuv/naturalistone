import { Box, Divider, useMediaQuery } from "@chakra-ui/react";
import ProductCardCart from "../../components/navBar/cartProducts";
import { useAppSelector } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";

export default function PreCheckoutCart() {


  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  return (
    <>
      <Box
        mt={"5vh"}
        display={"flex"}
        flexDir={"column"}
        h={"65vh"}
        overflow={"auto"}
      >
        {
          typeof cart !== "string" &&
            cart?.map((product) => {
              return (
                <Box key={product.idCartEntry}>
                  <Box
                    display={"flex"}
                    flexDir={!smallerThan740 ? "row" : "column"}
                    justifyContent={"space-between"}>
                    <ProductCardCart product={product} preCheckout={true} />
                  </Box>
                  <Divider borderColor={"gray.700"} my={"0.5vh"} />
                </Box>
              );
            })}
        
      </Box>
    </>
  );
}