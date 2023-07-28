"use client";
import HomeProductContainer from "@/app/home/_homeProductContainer";
import NavBar from "../../../../_navBar/_navBar";
import ProdDetailContainer from "./prodDetailContainer";


//esto es solamente un ejemplo de landing para probar el link. Puede borrarse todo.
export default function Detail({params}) {

  return (
    <>
      <NavBar />
      <ProdDetailContainer params={params}/>
      <HomeProductContainer productsFilter={{color:'', material: ''}}/>
    </>
  );
}
