/* eslint-disable indent */
import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Button,
  Text,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import { PiCaretDownThin } from "react-icons/pi";
import "../../app/assets/styleSheet.css";
import { Product, ProductState } from "@/store/products/typesProducts";
import AddProductToCart from "./addToCartDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsValues,
  loadProduct,
} from "@/store/products/actionsProducts";
import Link from "next/link";
import AddSampleProductToCart from "./addSampleToCartDropdown";
import { css } from "@emotion/react";

import { PiHeartThin } from "react-icons/pi";
import { MenuFavoriteProductCard } from "./MenuFavoriteProductCard";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import { LoginState } from "@/store/login/typeLogin";

const ProductCard: React.FC<{ product: Product; site: string }> = ({
  product,
  site,
}) => {
  const dispatch = useAppDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disableBox, setDisableBox] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [dropDownZIndex, setDropDownZIndex] = useState(0);
  const [showAddSampleToCart, setShowAddSmapleToCart] = useState(false);

  const { Naturali_ProdName, Material, ProdNameID } = product;

  const URL = `https://naturalistone-images.s3.amazonaws.com/${Material}/${Naturali_ProdName}/${Naturali_ProdName}_0.jpg`;
  const buttonGradientStyle = css`
    background: radial-gradient(
      farthest-side at center,
      rgba(0, 0, 0, 0.05) 0%,
      transparent 100%
    );
  `;

  const { productValues } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const favorites = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) =>
      state.favoritesReducer.favorites
  );

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
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
    setShowAddSmapleToCart(false);
    setShowAddToCart(true);
  };

  const handleAddSampleToCart = () => {
    setShowAddToCart(false);
    setShowAddSmapleToCart(true);
  };

  const handleClickCard = () => {
    dispatch(loadProduct(product));
  };

  useEffect(() => {
    dispatch(fetchFavorites(3999));
  }, []);

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
        <Link
          href={`/products/${Material}/${Naturali_ProdName}/${ProdNameID}`}
          onClick={handleClickCard}
        >
          <NextImage objectFit="cover" fill src={URL} alt="img" />
        </Link>
        <MenuFavoriteProductCard
          ProdNameID={ProdNameID}
          favorites={favorites}
          user={user}
        />
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
            w={"260px"}
            h={"370px"}
            zIndex={dropDownZIndex}
            className="custom-popover"
            bg={"rgba(0, 0, 0, 0.35)"}
          >
            <Box
              h={"370px"}
              //bg={!showAddToCart ? "rgba(210, 210, 210, 0.7)" : (site === "products" ? "rgba(210, 210, 210, 0.7)" : "white")}
            >
              <Center h={"100%"} flexDir={"column"}>
                <Text
                  fontSize={"0.7rem"}
                  fontWeight={"normal"}
                  color={"white"}
                  textTransform={"uppercase"}
                >
                  {Material}
                </Text>
                <Button
                  css={buttonGradientStyle}
                  variant={"unstyled"}
                  textTransform={"uppercase"}
                  fontSize={"1.4rem"}
                  color={"white"}
                  fontWeight={"light"}
                >
                  {Naturali_ProdName}
                </Button>
              </Center>
              <Box
                display={"flex"}
                w={"260px"}
                h={"40px"}
                position={"absolute"}
                bottom={0}
                left={0}
                placeContent={"center"}
              >
                <IconButton
                  color={"white"}
                  display={"flex"}
                  placeContent={"center"}
                  icon={<PiCaretDownThin />}
                  variant={"unstyled"}
                  fontSize={"1.5rem"}
                  aria-label={"Description"}
                  onClick={handleAddProductToCart}
                  hidden={
                    showAddSampleToCart == true || showAddToCart == true
                      ? true
                      : false
                  }
                />
              </Box>
              {showAddToCart || showAddSampleToCart ? (
                <>
                  <Box
                    w={"260px"}
                    px={"10px"}
                    mt={"-45px"}
                    h={"45px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      fontSize={"0.8rem"}
                      fontWeight={showAddSampleToCart ? "semibold" : "light"}
                      variant={"unstyled"}
                      color={"white"}
                      _hover={{
                        fontWeight: "semibold",
                      }}
                      onClick={handleAddSampleToCart}
                    >
                      ORDER SAMPLE
                    </Button>
                    <Button
                      fontSize={"0.8rem"}
                      fontWeight={showAddToCart ? "semibold" : "light"}
                      color={"white"}
                      variant={"unstyled"}
                      _hover={{
                        fontWeight: "semibold",
                      }}
                      onClick={handleAddProductToCart}
                    >
                      ADD TO CART
                    </Button>
                  </Box>
                  {showAddToCart && (
                    <Box position={"relative"} zIndex={100}>
                      <AddProductToCart
                        ProdNameID={ProdNameID}
                        productValues={productValues}
                      />
                    </Box>
                  )}
                  {showAddSampleToCart && (
                    <Box position={"relative"} zIndex={100}>
                      <AddSampleProductToCart
                        ProdNameID={ProdNameID}
                        productValues={productValues}
                      />
                    </Box>
                  )}
                </>
              ) : null}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
