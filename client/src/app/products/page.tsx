
'use client'
import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import MaterialFilter from "./materialFilter";


export default function Products() {
  return (
    <>
      <NavBar />
      <MaterialFilter/>
      {/* <Grid
        h={'92.5vh'}
        templateRows="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" // 3 filas en el eje y
        templateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" // 3 columnas en el eje x
        gap={2}>
        <GridItem bg={'blue'} rowSpan={2} colSpan={8}></GridItem>
        <GridItem bg={'red'} rowSpan={6} colSpan={1} ></GridItem>
        <GridItem bg={'yellow'} rowSpan={6} colSpan={7} ></GridItem>
      </Grid> */}
    </>
  );
}
