"use client";
import HomeProductContainer from "@/app/home/_homeProductContainer";
import Carousel from "./_carousel";
import { Filters } from "./filters/filters";
import React, { useState, useEffect, useContext, useRef } from "react";
import HomeIntExt from "./HomeIntExt";
import { Box } from "@chakra-ui/react";
import Section from "./motionSection";
import ImgButton from "./imgButton";
import { ProductsHomeFilterProps } from "@/interfaces/home";
import Cookies from "js-cookie";
import { AppContext } from "../appContext";

const card1 = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1539778100343-71fcce08a31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  }
];
const card2 = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1496150458551-140441714f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];
const card3 = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
  },
];


export default function Home() {
  const [productsFilter, setProductsFilter] = useState<ProductsHomeFilterProps>(
    {
      colorName: "",
      material: "Terrazzo",
      materialValue: "",
    }
  );
  const appContext = useContext(AppContext);
  
  const [visibleSection, setVisibleSection] = useState(0); // Inicialmente, ninguna sección está visible.

  const sectionRefs = [
    useRef<HTMLDivElement>(null), // Referencia a la primera sección
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Esta función manejará la detección de la sección actualmente visible
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
  
    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        const sectionTop = ref.current.offsetTop;
        const sectionBottom = sectionTop + ref.current.clientHeight;
  
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setVisibleSection(index);
        }
      }
    });
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <>
      { 
        (visibleSection === 0) && (
          <ImgButton color={"logo.gray"} name={"Pietra Serena"} material={"Limestone"}/>
        )
      }
      { 
        (visibleSection === 1) && (
          <ImgButton color={"white"} name={"Black Callacata"} material={"Marble"}/>
        )
      }
      { 
        (visibleSection === 2) && (
          <ImgButton color={"logo.gray"} name={"White Callacata"} material={"Porcelain"}/>
        )
      }
      <Section ref={sectionRefs[0]}>
        <Carousel items={card1} />
      </Section>
      <Section ref={sectionRefs[1]}>
        <Carousel items={card2} />
      </Section>
      <Section ref={sectionRefs[2]}>  
        <Carousel items={card3} />
      </Section>
      <Section ref={sectionRefs[3]}>
        <HomeIntExt/>
      </Section>
      <Section ref={sectionRefs[4]}>
        <Box h={"100vh"} w={"100vw"} bg={"site.lightBg"} pt={"10vh"}>
          <HomeProductContainer/>
          <Filters
            setProductsFilter={setProductsFilter}
            productsFilter={productsFilter}
          />
        </Box>
      </Section>
    </>
  );
}
