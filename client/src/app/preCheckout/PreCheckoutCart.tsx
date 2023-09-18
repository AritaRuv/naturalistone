import { Box, Checkbox, Divider, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import ProductCardCart from "../../components/navBar/cartProducts";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";
import { LoginState } from "@/store/login/typeLogin";

export default function PreCheckoutCart() {

  const [subTotal, setSubTotal] = useState("$ 0,00");

  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  useEffect(() => {
    
    const subT = cart.reduce((total, item) => {
      return total + (item.SalePrice * item.Quantity);
    }, 0);
    
    console.log("Subtotal: ", currencyFormat(subT));
    setSubTotal(currencyFormat(subT));
  }, [user,cart]);

  function currencyFormat(num) {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
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
                    bg='tomato'
                    display={"flex"}
                    flexDir={!smallerThan740 ? "row" : "column"}
                    w={"98%"}
                    justifyContent={"space-between"}>
                    <ProductCardCart product={product} preCheckout={true} />
                    {/* {
                      !smallerThan740 ? (
                        <Box
                          w={"95px"}
                          h={"178px"}
                          display={"flex"}
                          alignItems={"center"}>
                          <VStack>
                            <Checkbox defaultChecked>Facturar</Checkbox>
                            <Text
                              h={"30px"}
                              fontWeight={"semibold"}
                              textAlign={"center"}>
                            $ {product.SalePrice * product.Quantity}
                            </Text>
                          </VStack>
                        </Box>
                      ) : (
                        <Box
                          w={"94%"}
                          h={"30px"}
                          display={"flex"}
                          justifyContent={"flex-end"}>
                          <Text h={"30px"} fontWeight={"semibold"}>
                              ${product.SalePrice * product.Quantity}
                          </Text>
                        </Box>
                      )} */}
                      
                  </Box>
                </Box>
              );
            })}
        
        </Box>

      </Box>
    </>
  );
}