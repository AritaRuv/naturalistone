"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { boolean, number, text } from "@storybook/addon-knobs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { fetchProductImages } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";


export default function ProdDetailCarousel({params}) {

  const { Material, Naturali_ProdName, ProdNameID } = params;

  const dispatch = useAppDispatch();

  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const ariaLabel = text("ariaLabel", "Carousel Aria Label");
  const tooglesGroupId = "Toggles";
  const valuesGroupId = "Values";

  useEffect(() => {
    dispatch(fetchProductImages(Material, Naturali_ProdName));
  }, []);


  const getConfigurableProps = () => ({
    showArrows: boolean("showArrows", true, tooglesGroupId),
    showStatus: boolean("showStatus", false, tooglesGroupId),
    showIndicators: boolean("showIndicators", true, tooglesGroupId),
    infiniteLoop: boolean("infiniteLoop", true, tooglesGroupId),
    showThumbs: boolean("showThumbs", false, tooglesGroupId),
    useKeyboardArrows: boolean("useKeyboardArrows", true, tooglesGroupId),
    autoPlay: boolean("autoPlay", true, tooglesGroupId),
    stopOnHover: boolean("stopOnHover", true, tooglesGroupId),
    swipeable: boolean("swipeable", true, tooglesGroupId),
    dynamicHeight: boolean("dynamicHeight", true, tooglesGroupId),
    emulateTouch: boolean("emulateTouch", true, tooglesGroupId),
    autoFocus: boolean("autoFocus", false, tooglesGroupId),
    selectedItem: number("selectedItem", 0, {}, valuesGroupId),
    interval: number("interval", 10000, {}, valuesGroupId),
    transitionTime: number("transitionTime", 500, {}, valuesGroupId),
    swipeScrollTolerance: number("swipeScrollTolerance", 5, {}, valuesGroupId),
    ariaLabel: text("ariaLabel", ariaLabel),
  });

  const imageStyle: React.CSSProperties = {
    width: "100%", // Ajusta el ancho de la imagen al 100% del contenedor 
    height: smallerThan740 ? "500px" : "300px",
    objectFit: "cover", // Ajusta el valor de objectFit a "cover" o "contain"
  };

  const thumbnailURLs  = useAppSelector((state: { productReducer: ProductState }) => state.productReducer.product_images);

  // Configuración para el carrusel de miniaturas
  const thumbnailSettings = {
    slidesToShow: 4, // Mostrar hasta 4 imágenes o la cantidad disponible
    slidesToScroll: 1,
    infinite: thumbnailURLs.length > 4 ? true : false, // Habilitar desplazamiento solo si hay 4 o más imágenes
  };

  const getThumbnailOpacity = (index) => {
    return index === selectedThumbnail ? 1 : 0.5;
  };


  return (
    <Flex justifyContent="center" alignItems="center" 
      w={!smallerThan740 ? 
        !smallerThan1200 ? 
          "50%" 
          : "100%" 
        : "100%"
      } 
      pr={"1%"}  
      minH={"300px"}>
      <Box w={!smallerThan740 ? "90%" : "100%"} minW={"520px"}>

        {/* Carrusel Grande */}
        <Box w={"100%"}>
          <Carousel
            {...getConfigurableProps()}
            infiniteLoop
            selectedItem={selectedItem}
            onChange={(index) => {
              setSelectedItem(index);
              setSelectedThumbnail(index);
            }}
          >
            {thumbnailURLs.map((imageData, index) => (
              <Box key={index}>
                <img src={imageData.url} style={imageStyle}/>
              </Box>
            ))}
          </Carousel>
        </Box>
        {/* Carrusel Grande */}   


        {/* Carrusel Chico */}     
        {
          !smallerThan740 ?  (
            thumbnailURLs.length > 4 ? (
              <Box mt={6} w={"100%"}  maxH={"120px"}>
                <Slider {...thumbnailSettings}>
                  {thumbnailURLs.map((imageData, index) => (
                    <Box key={index} p={2} cursor="pointer" opacity={getThumbnailOpacity(index)}>
                      <img
                        src={imageData.url}
                        alt={`Thumbnail ${index}`}
                        style={{ width: "152px", height: "100px", objectFit: "cover" }}
                        onClick={() => setSelectedItem(index)}
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>)
              : (
                <Box mt={6} w={"100%"} maxH={"120px"} display="flex" alignItems="flex-start">
                  {thumbnailURLs.map((imageData, index) => (
                    <Box key={index} p={2} cursor="pointer" opacity={getThumbnailOpacity(index)}>
                      <img
                        src={imageData.url}
                        alt={`Thumbnail ${index}`}
                        style={{ width: "152px", height: "100px", objectFit: "cover" }}
                        onClick={() => setSelectedItem(index)}
                      />
                    </Box>
                  ))}
                </Box>)
          )
            :
            null
        }
        {/* Carrusel Chico */}  
      </Box>
    </Flex>
  );
}
