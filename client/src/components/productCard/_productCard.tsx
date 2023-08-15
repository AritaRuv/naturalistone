import React from "react";
import { Box, IconButton, Button, Text, Center } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { PiCaretDownThin } from "react-icons/pi";
import "../../app/assets/styleSheet.css";
import { Product, ProductState } from "@/store/products/typesProducts";
import AddProductToCart from "./addToCartDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsValues, loadProduct } from "@/store/products/actionsProducts";
import Link from "next/link";
import AddSampleProductToCart from "./addSampleToCartDropdown";


const ProductCard: React.FC<{ product: Product; site: string }> = ({
  product,
  site,
}) => {
  const dispatch = useAppDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disableBox, setDisableBox] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [ dropDownZIndex, setDropDownZIndex ] = useState(0);
  const [showAddSampleToCart, setShowAddSmapleToCart] = useState(false);

  const { Naturali_ProdName, Material, ProdNameID  } = product;

  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`;

  const { productValues } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setDisableBox(true);
    setDropDownZIndex(10);
    if (!(ProdNameID in productValues)) {
      dispatch(fetchProductsValues({ ProdNameID }));
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setDisableBox(false);
    setShowAddToCart(false);
    setShowAddSmapleToCart(false);
    setDropDownZIndex(0);
  };

  const handleAddProductToCart = () => {
    setShowAddToCart(true);
  };

  const handleAddSampleToCart = () => {
    setShowAddSmapleToCart(true);
  };

  const handleClickCard = () => {
    dispatch(loadProduct(product));
  };

  return (
    <Box position="relative">
      <Box
        w={"260px"}
        h={"370px"}
        position={"relative"}
        overflow={"hidden"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/products/${Material}/${Naturali_ProdName}/${ProdNameID}`} onClick={handleClickCard}>
          <NextImage objectFit="cover" fill src={URL} alt="img" />
        </Link>
        <Box
          display={"flex"}
          w={"260px"}
          bg={"rgba(210, 210, 210, 0.5)"}
          h={"40px"}
          position={"absolute"}
          bottom={0}
          left={0}
          hidden={disableBox}
          placeContent={"center"}
        >
          <IconButton
            display={"flex"}
            placeContent={"center"}
            icon={<PiCaretDownThin />}
            variant={"unstyled"}
            size={"lg"}
            maxH={"30px"}
            aria-label={"Description"}
          />
        </Box>
      </Box>
      <Box position="absolute" bottom={0} left={0} w={"100%"} zIndex={10}>
        {isDropdownOpen && (
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            position={"relative"}
            h={"100px"}
            w={"260px"}
            zIndex={dropDownZIndex}
            className="custom-popover"
            bg={!showAddToCart ? "rgba(210, 210, 210, 0.7)" : (site === "products" ? "rgba(210, 210, 210, 0.7)" : "white")}
            borderBottomEndRadius={"md"}
            borderBottomStartRadius={"md"}
          >
            <Box pt={"2%"} bg={!showAddToCart ? "rgba(210, 210, 210, 0.7)" : (site === "products" ? "rgba(210, 210, 210, 0.7)" : "white")}>
              <Center mt={"5%"} flexDir={"column"} h={"40px"}>
                <Text fontSize={"0.6rem"} textTransform={"uppercase"}>
                  {Material}
                </Text>
                <Button
                  variant={"unstyled"}
                  textTransform={"uppercase"}
                  fontSize={"0.9rem"}
                >
                  {Naturali_ProdName}
                </Button>
              </Center>
              { 
                !showAddToCart && !showAddSampleToCart ?
                  <Box display={"flex"} justifyContent={"space-between"} px={"8%"}>
                    <Button
                      fontSize={"0.6rem"}
                      fontWeight={"light"}
                      variant={"unstyled"}
                      _hover={{
                        fontWeight: "semibold",
                      }}
                      onClick={handleAddSampleToCart}
                    >
                  ORDER SAMPLE
                    </Button>
                    <Button
                      fontSize={"0.6rem"}
                      fontWeight={"light"}
                      variant={"unstyled"}
                      _hover={{
                        fontWeight: "semibold",
                      }}
                      onClick={handleAddProductToCart}
                    >
                  ADD TO CART
                    </Button>
                  </Box>
                  :
                  showAddToCart ?
                    <Box position={"relative"} zIndex={100}>
                      <AddProductToCart ProdNameID={ProdNameID} productValues={productValues}/>
                    </Box>
                    :
                    showAddSampleToCart ?  
                      <AddSampleProductToCart ProdNameID={ProdNameID} productValues={productValues}/>
                      : null
              }
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;

