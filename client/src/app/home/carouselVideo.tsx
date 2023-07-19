"use client";
import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

export default function CarouselVideo({ source }) {
  const [smallerThan1000] = useMediaQuery("(max-width: 1000px)");
  const [smallerThan920] = useMediaQuery("(max-width: 920px)");
  const [smallerThan700] = useMediaQuery("(max-width: 700px)");
  const [smallerThan450] = useMediaQuery("(max-width: 450px)");
  const [boxHeight, setBoxHeight] = useState("70vh");
  const [boxHeightVideo, setBoxHeightVideo] = useState("");
  const [bottomVideo, setBottomVideo] = useState("200px");

  useEffect(() => {
    if (!smallerThan1000) {
      setBoxHeight("50vh");
      setBoxHeightVideo("");
      setBottomVideo("150px");
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
      setBoxHeight("160px");
      setBoxHeightVideo("500px");
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
        mt={"-1vh"}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            width: "100vw",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
            bottom: bottomVideo,
            height: boxHeightVideo,
          }}
        >
          <source src={source} />
        </video>
      </Box>
    </>
  );
}
