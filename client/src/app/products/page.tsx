
'use client'
import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import MaterialFilter from "./materialFilter";


export default function Products() {
  return (
    <>
      <NavBar />
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}>
        <GridItem bg={'blue'}></GridItem>
        <GridItem bg={'red'}></GridItem>
        <GridItem bg={'yellow'}></GridItem>
      </Grid>
    </>
  );
}
