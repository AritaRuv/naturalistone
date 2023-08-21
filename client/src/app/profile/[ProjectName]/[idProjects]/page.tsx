"use client";
import { Box } from "@chakra-ui/react";
import ProjecteInfo from "./projectInfo";
import ProductsProjectContainer from "./productProjectContainer";
import { useEffect } from "react";
import { fetchProjectByID } from "@/store/projects/actionsProjects";
import { useAppDispatch } from "@/store/hooks";
import { fetchFavoritesByProject } from "@/store/favorites/actionsFavorites";


export default function Project({params}) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchProjectByID(params.idProjects));
    dispatch(fetchFavoritesByProject(params.idProjects));
  }, []);

  return (
    <>
      <Box display={"flex"} flexDir={"row"} justifyContent={"flex-start"} >
        <ProjecteInfo params={params}/>
        <ProductsProjectContainer/>
      </Box>
      
    </>
  );
}
