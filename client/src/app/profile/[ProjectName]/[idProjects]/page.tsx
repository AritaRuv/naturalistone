"use client";
import { Box } from "@chakra-ui/react";
import ProjecteInfo from "./projectInfo";
import ProductsProjectContainer from "./productProjectContainer";
import { useEffect } from "react";
import { fetchProjectByID } from "@/store/projects/actionsProjects";
import { useAppDispatch } from "@/store/hooks";
import { fetchFavoritesByProject } from "@/store/favorites/actionsFavorites";
import ProjectMenu from "./projectMenu";
import { useState } from "react";


export default function Project({params}) {

  const [ focus, setFocus ] = useState("favorites");

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchProjectByID(params.idProjects));
    dispatch(fetchFavoritesByProject(params.idProjects));
  }, []);

  return (
    <>
      <Box display={"flex"} flexDir={"row"} mb={"5vh"} alignItems={"flex-end"} justifyContent={"space-between"} >
        <ProjectMenu params={params} focus={focus} setFocus={setFocus}/>
        {
          (focus === "favorites") && (
            <ProductsProjectContainer/>
          )
        }
        {
          (focus === "information") && (
            <ProjecteInfo params={params}/>
          )
        }

      </Box>
      
    </>
  );
}
