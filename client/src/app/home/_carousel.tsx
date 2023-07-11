"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  IconButton,
  useBreakpointValue,
  Text,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { PiCaretDownThin } from "react-icons/pi";

export default function Carousel({ mt, items, hidden }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [currentImage, setCurrentImage] = useState(items[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hiddenBox, setHiddenBox] = useState(false);
  const [smallerThan900] = useMediaQuery("(max-width: 900px)");
  const [smallerThan880] = useMediaQuery("(max-width: 880px)");
  const [smallerThan760] = useMediaQuery("(max-width: 760px)");
  const [smallerThan490] = useMediaQuery("(max-width: 490px)");
  const [boxHeight, setBoxHeight] = useState("800px");

  // useEffect(() => {
  //   if (!smallerThan900) setBoxHeight("800px");
  //   if (smallerThan900) setBoxHeight("700px");
  //   if (smallerThan880) setBoxHeight("600px");
  //   if (smallerThan760) setBoxHeight("550px");
  //   // if (smallerThan760) setBoxHeight("650px");
  //   // else setBoxHeight("800px");
  // }, [smallerThan900, smallerThan760, !smallerThan900]);

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
    <>
      <Box
        position={"relative"}
        height={"800px"}
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
                bottom={6}
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
                  bottom={15}
                  left={0}
                  bg={"rgb(180, 177, 179)"}
                  opacity={0.7} // Ajusta la opacidad según tus necesidades
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box
                    w={"full"}
                    pt={"14px"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      w={"50vw"}
                      mb={"5vw"}
                    >
                      <Box>
                        <Center>
                          <Text
                            variant={"unstyled"}
                            bg={"none"}
                            fontSize={"1.3rem"}
                          >
                            {elem.material.toUpperCase()}
                          </Text>
                        </Center>
                      </Box>
                      <Box>
                        <Center>
                          <Text
                            variant={"unstyled"}
                            bg={"none"}
                            fontSize={"1rem"}
                          >
                            {elem.name.toUpperCase()}
                          </Text>
                        </Center>
                      </Box>
                      <Box>
                        <Center>
                          <Button
                            variant={"unstyled"}
                            bg={"none"}
                            fontSize={"0.9rem"}
                          >
                            Discover Collection
                          </Button>
                        </Center>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}
