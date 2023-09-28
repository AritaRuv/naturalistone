import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  useMediaQuery,
  Center,
  Checkbox,
  Stack,
  Icon,
  Tooltip
} from "@chakra-ui/react";
import NextImage from "next/image";
import "../../app/assets/styleSheet.css";
import { ProductCart } from "@/store/cart/typesCart";
import { deleteCart, updateCart } from "@/store/cart/actionsCart";
import { useAppDispatch } from "@/store/hooks";
import { PiInfoThin } from "react-icons/pi";

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

      const porcentaje = Math.round((10*(quantity /100)));
      let newPorcentaje = (quantity / 100) * 10;
      if (quantity >= 10){
        newPorcentaje = Math.round( newPorcentaje);
        const newQuantity = Quantity + newPorcentaje;
        setAddExtra(1);
        setQuantity(newQuantity);
        updateCartQuantityExtraInvoice(newQuantity, 1, toInvoice);
      }

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
      updateCartQuantityExtraInvoice(quantity, AddExtra, 1);

    }
    else {
      setToInvoice(0);
      updateCartQuantityExtraInvoice(quantity, AddExtra, 0);

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
    dispatch(deleteCart(idCartEntry));
  };

  return (
    <>
      <Box
        h={"175px"}
        w={"100%"}
        overflow={"hidden"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={toInvoice === 1 ? "rgba(227, 116, 37, 0.05)" : "white"}
      >
        {/* Caja que contiene la imagen, y las especificaciones */}
        <Stack 
          ms={preCheckout ? "2vw" : "50px"} 
          direction={["column", "row"]} >
          {
            isExtraSmallScreen ? (
              <Box h={"110px"} w={"120px"} position={"relative"} overflow={"hidden"}>
                <NextImage style={{objectFit:"cover"}} fill src={URL} alt="img" sizes="(max-width: 120px)"  />
              </Box>
            ) : (
              <Box position="relative" display={"flex"} alignContent={"center"}>
                <Box h="140px" w="140px"
                  position={"relative"}
                  overflow={"hidden"}
                  zIndex="0"
                >
                  <NextImage
                    sizes="(max-width: 140px)"
                    src={URL}
                    alt="Imagen"
                    fill
                    style={{objectFit:"cover"}}
                  />
                </Box>
              </Box>
            )}
          {/* Caja que contiene solo las especificaciones */}
          <Box 
            h={isExtraSmallScreen ? "120px" : "140px"} 
            ms={2}  
            w={"220px"} 
            display={"flex"} 
            flexDir={"column"} 
            justifyContent={"space-between"}
          >
            <Box>
              <Text 
                textTransform={"uppercase"} 
                fontSize={fontSubTitle}>{Material}
              </Text>
              <Text 
                textTransform={"uppercase"} 
                fontWeight={"bold"} 
                fontSize={fontTitle}>{Naturali_ProdName}</Text>
              {
                quantity > 0 ? (
                  <Text textTransform={"uppercase"} fontSize={"0.6rem"} color={"gray.600"}>{Finish} - {Size} - {Thickness}-{Type}</Text>
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
                  <Box>
                  </Box>
                  {
                    preCheckout && 
                  <Box display={"flex"} flexDirection={"row"} mt={"10px"} position={"relative"}>
                    <Checkbox
                      mr={"10px"}
                      borderColor={"blackAlpha.400"} 
                      colorScheme='whiteAlpha' 
                      iconColor="orange" 
                      isChecked={AddExtra === 1} 
                      onChange={handleAddExtraChange}/>
                    <Text fontSize={"0.7rem"} fontWeight={"light"} mr={"10px"} >ADD 10% MORE</Text>
                    <Icon as={PiInfoThin}/>
                  </Box>

                  }
                </>
              )}
            </Box>
          </Box>
        </Stack>
      
        {/* Caja que contiene el precio */}
        <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
          <Text
            h={"30px"}
            fontSize={"1.1rem"}
            fontWeight={"thin"}
            textAlign={"center"}>
            {
              Type === "Sample" ? (
                "SAMPLE"
              ):(
                `${(Quantity * SalePrice).toFixed(2)}`
              )
            }
              
          </Text>
        </Box>
        {/* Caja que contiene elncheckbox de pre check out */}
        <Box>
          {
            preCheckout && (
              <>
                <Box display={"flex"} flexDir={"row"} mr={"1vw"}>
                  <Checkbox
                    colorScheme='whiteAlpha' 
                    iconColor="orange" 
                    mr={"10px"}
                    isChecked={ToInvoice===1} 
                    onChange={handleAddInvoiceChange}/>
                </Box>
              </>
            )
            
          }
        </Box>
      </Box>

    </>
    
  );
};

export default ProductCardCart;
