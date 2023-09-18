import { Box,  Divider, useMediaQuery } from "@chakra-ui/react";
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
        display={"flex"}
        flexDir={"column"}
        w={smallerThan740 ? "full" : "50%"}>
        <Box h={"60%"} overflow={"auto"} minW={"450px"} w={"full"} mt={"2%"}>
          {
            cart?.map((product) => {
              return (
                <Box key={product.idCartEntry}>
                  <Divider borderColor={"gray.700"} my={"2%"} />
                  <Box
                    display={"flex"}
                    flexDir={!smallerThan740 ? "row" : "column"}
                    w={"98%"}
                    justifyContent={"space-between"}>
                    <ProductCardCart product={product} preCheckout={true} />
                  </Box>
                </Box>
              );
            })}
        
        </Box>

      </Box>
    </>
  );
}