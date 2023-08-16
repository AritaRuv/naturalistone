"use client";
import HomeProductContainer from "@/app/home/_homeProductContainer";
import Carousel from "./_carousel";
import CarouselVideo from "./carouselVideo";
import { Filters } from "./filters/filters";
import { useState } from "react";

const cards = [
  {
    material: "Terrazo",
    name: "Calacatta especial",
    img: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    material: "Honed",
    name: "Nombre Honed",
    img: "https://images.unsplash.com/photo-1582913130063-8318329a94a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
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

  return (
    <>
      <Carousel mt={"-10vh"} items={cards} />
      <CarouselVideo
        source={
          "https://naturalistone-images.s3.amazonaws.com/131642+(Original).mp4"
        }
      />
      <Carousel mt={"0px"} items={cards} />
      <CarouselVideo
        source={
          "https://cdn.coverr.co/videos/coverr-bathroom-in-a-mobile-home-3685/1080p.mp4"
        }
      />
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
