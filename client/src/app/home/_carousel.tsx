"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  IconButton,
  useBreakpointValue,
  Text,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { PiCaretDownThin } from "react-icons/pi";

export default function Carousel({ h, mt, items, hidden }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [currentImage, setCurrentImage] = useState(items[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hiddenBox, setHiddenBox] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setHiddenBox(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setHiddenBox(false);
  };

  // Settings for the slider
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      position={"relative"}
      height={h}
      width={"100%"}
      overflow={"hidden"}
      mt={mt}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {items.map((elem, index) => (
          <Box
            key={index}
            height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            bottom={"100px"}
            backgroundImage={`url(${elem.img})`}
          >
            <Box
              position="absolute"
              bottom={0}
              left={0}
              width={"100%"}
              // mt={mt}
              h={"40vh"}
              bg={"rgb(180, 177, 179)"}
              opacity={0.7} // Ajusta la opacidad según tus necesidades
              hidden={hiddenBox}
              placeContent={"center"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}

            >
              <IconButton
                display={"flex"}
                aria-label={"description"}
                icon={<PiCaretDownThin />}
                h={"10px"}
                mt={"15px"}
                ml={"48vw"}
                color={"black"}
              ></IconButton>
            </Box>
            {isDropdownOpen && (
              <Box
                w={"full"}
                h={"47vh"}
                position={"absolute"}
                placeContent={"center"}
                bottom={0}
                left={0}
                bg={"rgb(180, 177, 179)"}
                opacity={0.7} // Ajusta la opacidad según tus necesidades
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Box w={"full"} border={"2px solid red"} pt={"14px"} display={"flex"} justifyContent={"center"}>
                  <Box display={"flex"} flexDirection={"column"} bg={"red"} w={"15vw"} mb={"5vw"}>
                    <Box>
                      <Center>
                        <Text variant={"unstyled"} bg={"none"} fontSize={"1.3rem"}>
                          {elem.material}
                        </Text>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                        <Text variant={"unstyled"} bg={"none"} fontSize={"1rem"}>
                          {elem.name}
                        </Text>
                      </Center>
                    </Box>
                    <Box>
                      <Center>
                        <Button variant={"unstyled"} bg={"none"} fontSize={"0.9rem"}>
                      Discover Collection
                        </Button>
                      </Center>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        ))
        }
      </Slider>
      {/* <Box
        display={"flex"}
        w={"full"}
        bg={"rgba(210, 210, 210, 0.3)"}
        // maxH={"50px"}
        // minH={"40px"}
        h={"5vh"}
        position={"absolute"}
        bottom={0}
        left={0}
        hidden={hidden}
        placeContent={"center"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IconButton
          display={"flex"}
          aria-label={"description"}
          icon={<PiCaretDownThin />}
          h={"10px"}
        ></IconButton>
      </Box>
      {isDropdownOpen && (
        <Box
          display={"flex"}
          w={"full"}
          h={"12vh"}
          position={"absolute"}
          placeContent={"center"}
          bottom={0}
          bg={"rgba(210, 210, 210, 0.3)"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box border={"2px solid red"} pt={"5px"}>
            <Box>
              <Center>
                <Button variant={"unstyled"} bg={"none"} fontSize={"1.3rem"}>
                  Nombre del producto
                </Button>
              </Center>
            </Box>
            <Center>
              <Button variant={"unstyled"} bg={"none"} fontSize={"0.9rem"}>
                Discover Collection
              </Button>
            </Center>
          </Box>
        </Box>
      )} */}
    </Box>
  );
}
