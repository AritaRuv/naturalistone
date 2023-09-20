import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  useMediaQuery,
  Center,
  Checkbox,
  VStack,
  HStack,
  Stack
} from "@chakra-ui/react";
import NextImage from "next/image";
import "../../app/assets/styleSheet.css";
import { CartState, ProductCart } from "@/store/cart/typesCart";
import { deleteCart, updateCart } from "@/store/cart/actionsCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";

const ProductCardCart: React.FC<{ product: ProductCart, preCheckout: any }> = ({ product, preCheckout }) => {
  const {
    CustomerID,
    Finish,
    Material,
    Naturali_ProdName,
    Quantity,
    SalePrice,
    Size,
    Thickness,
    Type,
    idCartEntry,
    ToInvoice,
    AddExtra,
  } = product;

  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`;
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isExtraExtraSmallScreen] = useMediaQuery("(max-width: 400px)");
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer);

  const fontSubTitle = isExtraExtraSmallScreen ? "0.6rem" : "0.7rem";
  const fontTitle = isExtraExtraSmallScreen ? "0.7rem" : "0.9rem";
  
  const [quantity, setQuantity] = useState(Quantity);
  const [toInvoice, setToInvoice] = useState(ToInvoice);
  const [addExtra, setAddExtra] = useState(AddExtra);
  const [oldQuantity, setOldQuantity] = useState(Quantity);

  const [totalPrice, setTotalPrice] = useState((Quantity * SalePrice).toFixed(2)); 
    
  const price = Number(SalePrice);
  const dispatch = useAppDispatch();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantityExtraInvoice(newQuantity, addExtra,toInvoice);
      setTotalPrice((newQuantity * SalePrice).toFixed(2));

    }
  };
  const newQuantity = quantity + 1;
  const increaseQuantity = () => {
    setQuantity(newQuantity);
    updateCartQuantityExtraInvoice(newQuantity, addExtra, toInvoice);
    setTotalPrice((newQuantity * SalePrice).toFixed(2));
  };
  const updateCartQuantityExtraInvoice = (newQuantity: number, addExtra: number, toInvoice: number) => {
    const bodyUpd = {
      Quantity: newQuantity,
      idCartEntry: idCartEntry,
      customerID: CustomerID,
      AddExtra: addExtra,
      ToInvoice: toInvoice
    };
    dispatch(updateCart(bodyUpd));
  };
  const handleAddExtraChange = (event) => 
  {
    
    const boolCheked =  event.target.checked;
    if (boolCheked){

      const porcentaje =Math.round((10*(quantity /100)));
      const newQuantity = Quantity + porcentaje;
      setAddExtra(1);
      setQuantity(newQuantity);
      updateCartQuantityExtraInvoice(newQuantity, 1, toInvoice);

    }
    else{
     
      setQuantity(oldQuantity);
      setAddExtra(0);
      updateCartQuantityExtraInvoice(oldQuantity,0,toInvoice);

    }
   
  };
  const handleAddInvoiceChange = (event) => {

    const boolCheked = event.target.checked;
    if (boolCheked) {
      setToInvoice(1);
      updateCartQuantityExtraInvoice(quantity, addExtra, 1);

    }
    else {
      setToInvoice(0);
      updateCartQuantityExtraInvoice(quantity, addExtra, 0);

    }

  };
  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    if (newQuantity > 0)
      setQuantity(newQuantity);
    else
      setQuantity(1);

    updateCartQuantityExtraInvoice(newQuantity, addExtra, toInvoice);
  };

  const handleQuantityBlur = () => {
    //updateCartQuantity(quantity, addExtra, toInvoice);
  };

  const handleDelete = () => {
    dispatch(deleteCart(idCartEntry, user?.CustomerID));
  };


  return (
    <>
      <Box
        h={"175px"}
        w={"100%"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        backgroundColor={quantity === 0 ? "sampleItemCart.gray" : "white"}
      >
        <Stack w={"100%"} ms={12} direction={["column", "row"]} >
          {
            isExtraSmallScreen ? (
              <Box h={"110px"} w={"120px"} position={"relative"} overflow={"hidden"}>
                <NextImage objectFit="cover" fill src={URL} alt="img" />
              </Box>
            ) : (
              <Box position="relative" display={"flex"} alignContent={"center"}>
                {/* <IconButton
                position="absolute"
                aria-label="Delete X"
                top="0px"
                left="0px"
                size={"lg"}
                transform="translate(-50%, -50%)"
                zIndex="1"
                icon={<IoIosCloseCircle />}
                borderRadius="full"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ boxShadow: "none" }}
                onClick={handleDelete}
              /> 
              */}
                <Box h="140px" w="140px"
                  position={"relative"}
                  overflow={"hidden"}
                  zIndex="0">
                  <NextImage
                    objectFit="cover"
                    src={URL}
                    alt="Imagen"
                    fill
                  />
                </Box>
              </Box>
            )}

          <Box h={isExtraSmallScreen ? "120px" : "140px"} ms={2}  w={"220px"} display={"flex"} flexDir={"column"} justifyContent={"space-between"}>
            <Box>
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>{Material}</Text>
              <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize={fontTitle}>{Naturali_ProdName}</Text>
              {
                quantity > 0 ? (<Text textTransform={"uppercase"} fontSize={"0.6rem"} color={"gray.600"}>{Finish} - {Size} - {Thickness}-{Type}</Text>
                ) : (<Text textTransform={"uppercase"} fontSize={"0.6rem"} color={"gray.600"}>{Finish} - {Thickness}-{Type}</Text>
                )
              }
            </Box>
            <Box>
              {quantity > 0 && (
                <>
                  <Box display={"flex"} h={"28px"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text textTransform={"uppercase"} fontSize={fontSubTitle}>Price sqf</Text>
                    <Center w={"80px"}>
                      <Text textTransform={"uppercase"} fontSize={"0.8rem"}>
                      ${price}
                      </Text>
                    </Center>
                  </Box>
                  <Box w={"100%"} display={"flex"} h={"28px"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text textTransform={"uppercase"} fontSize={fontSubTitle}>Quantity</Text>
                    <Center w={"80px"} display={"flex"} flexDir={"row"} alignItems={"center"} justifyItems={"flex-end"}>
                      <Button
                        variant={"unstyled"}
                        size={"xs"}
                        onClick={decreaseQuantity}
                        fontWeight={"thin"}
                      >
                      -
                      </Button>
                      <Input
                        fontSize={"0.8rem"}
                        border={"none"}
                        borderBottom={"1px solid"}
                        borderBottomColor={"logo.gray"}
                        rounded={"none"}
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={handleQuantityChange}
                        onBlur={handleQuantityBlur}
                        size={"xs"}
                        textAlign={"center"}
                      />
                      <Button
                        variant={"unstyled"}
                        size={"xs"}
                        onClick={increaseQuantity}
                        fontWeight={"thin"}
                      >
                      +
                      </Button>
                    </Center>
                  </Box>
                  {
                    preCheckout && 
                  <Box>
                    <Checkbox size="sm" isChecked={AddExtra === 1} onChange={handleAddExtraChange} > Add 10% more</Checkbox>
                  </Box>

                  }
                </>
              )}
            </Box>
          </Box>
        </Stack>
        <VStack>
          {
            preCheckout && <Checkbox defaultChecked onChange={handleAddInvoiceChange}>Facturar</Checkbox>
          }
          <Text
            h={"30px"}
            fontWeight={"semibold"}
            textAlign={"center"}>
            ${(Quantity * SalePrice).toFixed(2)}
          </Text>
        </VStack>
      </Box>
    
    </>
  );
};

export default ProductCardCart;
