/* eslint-disable quotes */
// api.ts
import { Filters } from "@/app/products/productFilters/types";
import axios from "axios";

export const getProductsHome = async (material: string, colorId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products?material=${material}&colorId=${colorId}`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la API");
  }
};

export const getProductValues = async (ProdNameID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/id/${ProdNameID}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los product values de la API");
  }
};

export const getMaterials = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/material`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los material de la API");
  }
};

export const getProduct = async (ProdNameID: number, DimensionID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/IDs?ProdNameID=${ProdNameID}&DimensionID=${DimensionID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el product de la API");
  }
};

export const getDimension = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/dimension`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los dimension de la API");
  }
};

export const getProductsFilters = async (filters: Filters) => {
  try {
    const materialParam = filters.material ? filters.material.join(',') : '';
    const typeParam = filters.type ? filters.type.join(',') : '';
    const finishParam = filters.finish ? filters.finish.join(',') : '';
    const thicknessParam = filters.thickness ? filters.thickness.join(',') : '';
    const sizeParam = filters.size ? filters.size.join(',') : '';

    const response = await axios.get(
      `http://localhost:5000/api/products/filters?material=${materialParam}&type=${typeParam}&finish=${finishParam}&thickness=${thicknessParam}&size=${sizeParam}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la API");
  }
};

export const getProductImages = async (Material: string, Naturali_ProdName: string) => {
  try {
    // const materialParam = filters.material ? filters.material.join(",") : "";
    // const typeParam = filters.type ? filters.type.join(",") : "";
    // const finishParam = filters.finish ? filters.finish.join(",") : "";
    // const thicknessParam = filters.thickness ? filters.thickness.join(",") : "";
    // const sizeParam = filters.size ? filters.size.join(",") : "";
    // console.log("action", sizeParam);
    const response = await axios.get(
      `http://localhost:5000/api/S3/${Material}/${Naturali_ProdName}`
    ); 
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los dimension de la API");
  }
};

export const getProductValuesValidation = async ( finish:string, size:string, thickness:string, ProdNameID: number ) => {
  try {

    const response = await axios.get(
      `http://localhost:5000/api/products/valid/id/${ProdNameID}?finish=${finish}&size=${size}&thickness=${thickness}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los product values de la API");
  }
};

export const getProductsByMaterial = async (material: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/materialfilterby?material=${material}`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la API");
  }
};