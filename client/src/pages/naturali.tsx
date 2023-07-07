import { Center, Text, Box } from "@chakra-ui/react";
import HomeProductContainer from "@/app/components/homeProducts.tsx/_homeProductContainer";
import NavBar from "@/app/components/navBar/_navBar";

export default function Naturali() {
  return(
    <>
      <Center h={'100vh'} w={'100vw'}>
        <NavBar/>
        <HomeProductContainer/>
      </Center>
    </>
  )
}