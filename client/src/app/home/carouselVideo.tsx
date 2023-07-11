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

export default function CarouselVideo({ source }) {
  const [smallerThan1000] = useMediaQuery("(max-width: 1000px)");
  const [smallerThan920] = useMediaQuery("(max-width: 920px)");
  const [smallerThan700] = useMediaQuery("(max-width: 700px)");
  const [smallerThan450] = useMediaQuery("(max-width: 450px)");
  const [boxHeight, setBoxHeight] = useState("60vh");
  const [boxHeightVideo, setBoxHeightVideo] = useState("");

  useEffect(() => {
    if (!smallerThan1000) {
      setBoxHeight("400px");
      setBoxHeightVideo("900px");
    }
    if (smallerThan1000) {
      setBoxHeight("350px");
      setBoxHeightVideo("700px");
    }
    if (smallerThan700) {
      setBoxHeight("200px");
      setBoxHeightVideo("580px");
    }
    if (smallerThan450) {
      setBoxHeight("180px");
      setBoxHeightVideo("600px");
    }
  }, [
    !smallerThan1000,
    smallerThan1000,
    smallerThan920,
    smallerThan700,
    smallerThan450,
  ]);

  return (
    <>
      <Box
        position={"relative"}
        height={boxHeight}
        width={"100%"}
        overflow={"hidden"}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
            bottom: "25vh",
            height: boxHeightVideo,
          }}
        >
          <source src={source} />
        </video>
      </Box>
    </>
  );
}
