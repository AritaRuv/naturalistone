"use client";
import HomeProductContainer from "@/app/home/_homeProductContainer";
import Carousel from "./_carousel";
import CarouselVideo from "./carouselVideo";
import { Filters } from "./filters/filters";
import { useState } from "react";
import HomeMaterialContainer from "./homeProductMaterial";

const cards = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1539778100343-71fcce08a31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    material: "Honed",
    name: "Nombre Honed",
    img: "https://images.unsplash.com/photo-1520529890308-f503006340b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

export interface ProductsHomeFilterProps {
  colorId: string;
  material: string;
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
    }
  );

  return (
    <>
      <Carousel mt={"-10vh"} items={cards} />
      {/* <CarouselVideo
        source={
          "https://naturalistone-images.s3.amazonaws.com/131642+(Original).mp4"
        }
      /> */}
      <Carousel mt={"0px"} items={cards} />
      {/* <CarouselVideo
        source={
          "https://cdn.coverr.co/videos/coverr-bathroom-in-a-mobile-home-3685/1080p.mp4"
        }
      /> */}
      {/* <HomeMaterialContainer/> */}
      <HomeProductContainer
        productsFilter={productsFilter}
        setProductsFilter={setProductsFilter}
      />
      <Filters
        setProductsFilter={setProductsFilter}
        productsFilter={productsFilter}
      />
    </>
  );
}
