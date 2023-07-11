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

export default function CarouselVideo({source}) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

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
      height={"60vh"}
      width={"100%"}
      overflow={"hidden"}
    >
      <video autoPlay muted loop 
        style={{
          width: "100%",
          backgroundPosition:"center",
          backgroundSize:"cover",
          position:"relative",
          bottom:"25vh"
        }}>
        <source src={source} />
      </video>
    </Box>
  );
}
