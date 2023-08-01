import React, { useState } from "react";
import { Box, Button, Input, Text, useMediaQuery, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NextImage from "next/image";
import "../../app/assets/styleSheet.css";
import { ProductCart } from "@/store/cart/typesCart";
import { deleteCart, updateCart } from "@/store/cart/actionsCart";
import { useAppDispatch } from "@/store/hooks";
import { IoIosCloseCircle } from "react-icons/io";

const ProductCardCart: React.FC<{ product: ProductCart }> = ({ product }) => {
  
  const { CustomerID, Finish, Material, Naturali_ProdName, Quantity, SalePrice, Size, Thickness, Type, idCartEntry } = product;
  
  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`;
  
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isExtraExtraSmallScreen] = useMediaQuery("(max-width: 400px)");

  const fontSubTitle = isExtraExtraSmallScreen ? "0.7rem" : "0.9rem";
  const fontTitle = isExtraExtraSmallScreen ? "0.9rem" : "1.2rem";

  const [quantity, setQuantity] = useState(Quantity);
  const price = Number(SalePrice);
  const dispatch = useAppDispatch();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(newQuantity);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(newQuantity);
  };

  const updateCartQuantity = (newQuantity) => {
    const bodyUpd = {
      Quantity: newQuantity,
      idCartEntry: idCartEntry,
      customerID: CustomerID,
    };
    dispatch(updateCart(bodyUpd));
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    updateCartQuantity(newQuantity);
  };

  const handleQuantityBlur = () => {
    updateCartQuantity(quantity);
  };

  const handleDelete = () => {
    dispatch(deleteCart(idCartEntry, 1938));
  };
  
  return (
    <>
      <Box
        h={"175px"}
        w={isExtraSmallScreen ? "100%" : "440px"}
        overflow={"hidden"}
        rounded={"md"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        px={"4%"}
        py={"6%"}
      >
        {
          isExtraSmallScreen ? (
            <Box h={"120px"} w={"100px"} position={"relative"} overflow={"hidden"} rounded={"md"}>
              <NextImage objectFit="cover" fill src={URL} alt="img" />
            </Box>
          ) : (
            <Box position="relative" h="150px" w="150px">
              <IconButton
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
              <Box position="absolute" zIndex="0">
                <NextImage
                  objectFit="cover"
                  src={URL}
                  alt="Imagen"
                  width={150}
                  height={150}
                />
              </Box>
            </Box>
          )
        }

        <Box h={isExtraSmallScreen ? "100px" : "150px"} display={"flex"} flexDir={"column"} justifyContent={"space-between"}>
          <Box>
            <Text textTransform={"uppercase"} fontSize={fontSubTitle}>{Material}</Text>
            <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize={fontTitle}>{Naturali_ProdName}</Text>
            <Text textTransform={"uppercase"} fontSize={"0.8rem"} color={"gray.600"}>{Finish} - {Size} - {Thickness}-{Type}</Text>
          </Box>
          <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>Price sqf</Text>
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>${price}</Text>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text textTransform={"uppercase"} fontSize={fontSubTitle}>Quantity</Text>
              <Box display={"flex"} flexDir={"row"} alignItems={"center"} justifyItems={"flex-end"}>
                {
                  quantity > 1 ?
                    <Button variant={"unstyled"} size={"xs"} onClick={decreaseQuantity}>-</Button>
                    :
                    <IconButton
                      size={"xs"}
                      aria-label='Delete'
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      _focus={{ boxShadow: "none" }}
                      icon={<DeleteIcon />}
                      onClick={handleDelete}
                    />
                }
                <Input 
                  type="number" 
                  value={quantity} 
                  min={1} 
                  onChange={handleQuantityChange} 
                  onBlur={handleQuantityBlur}
                  size={"xs"} textAlign={"center"} w={quantity.toString().length < 1 ? "30px" : "35px"} />
                <Button variant={"unstyled"} size={"xs"} onClick={increaseQuantity}>+</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCardCart;

