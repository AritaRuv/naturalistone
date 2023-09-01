"use client";
import HomeProductContainer from "@/app/home/_homeProductContainer";
import Carousel from "./_carousel";
import { Filters } from "./filters/filters";
import { useState, useEffect, useContext } from "react";
import HomeMaterialContainer from "./homeProductMaterial";
import { Box } from "@chakra-ui/react";
import Section from "./motionSection";
import Cookies from "js-cookie";
import { AppContext } from "../appContext";

const card1 = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1539778100343-71fcce08a31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
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

export interface ProductsHomeFilterProps {
  colorId: string;
  material: string;
  materialValue?: string;
}

export interface FiltersHomeProps {
  setProductsFilter: React.Dispatch<
    React.SetStateAction<ProductsHomeFilterProps>
  >;
  productsFilter: ProductsHomeFilterProps;
}

export default function Home() {
  const [productsFilter, setProductsFilter] = useState<ProductsHomeFilterProps>(
    {
      colorId: "",
      material: "",
      materialValue: "",
    }
  );
  const appContext = useContext(AppContext);
  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      appContext && appContext.setUserLog(true);
    } else {
      appContext && appContext.setUserLog(false);
    }
  }, []);

  return (
    <>
      <Section>
        <Carousel items={card1} />
      </Section>
      <Section>
        <Carousel items={card2} />
      </Section>
      <Section>
        <Carousel items={card3} />
      </Section>
      {/* <Section>
        <HomeMaterialContainer/>
      </Section> */}
      <Section>
        <Box h={"100vh"} w={"100vw"} bg={"site.lightBg"} pt={"10vh"}>
          <HomeProductContainer
            productsFilter={productsFilter}
            setProductsFilter={setProductsFilter}
          />
          <Filters
            setProductsFilter={setProductsFilter}
            productsFilter={productsFilter}
          />
        </Box>
      </Section>
    </>
  );
}
