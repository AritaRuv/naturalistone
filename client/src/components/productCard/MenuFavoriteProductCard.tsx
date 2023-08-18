/* eslint-disable indent */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { ProjectsState } from "@/store/projects/typeProjects";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PiHeartStraightThin, PiHeartStraightFill } from "react-icons/pi";
import {
  deleteFavoriteProductInProject,
  fetchFavorites,
  postFavoritesProductInProject,
} from "@/store/favorites/actionsFavorites";
import { CreateNewProject } from "@/app/profile/addProjectModal";

export function MenuFavoriteProductCard({ ProdNameID, favorites, user }) {
  const dispatch = useAppDispatch();
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects
  );

  const [bgHeart, setBgHeart] = useState(false);
  const toast = useToast();

  const handleSubmit = async (idProject: number) => {
    const response = await dispatch(
      postFavoritesProductInProject(idProject, ProdNameID)
    );
    if (!response.success) {
      if (!toast.isActive("favProductProject")) {
        return toast({
          id: "favProductProject",
          title: "Error",
          status: "error",
          description: "Error in add product in the project",
          duration: 4000,
          isClosable: true,
        });
      }
    }
    if (!toast.isActive("favProductProject")) {
      toast({
        id: "favProductProject",
        title: "Success",
        status: "success",
        description: "The product has been successfully added to the project",
        duration: 4000,
        isClosable: true,
      });
      return dispatch(fetchFavorites(3999));
    }
  };

  const handleDelete = async (idProject: number, idProdName: number) => {
    dispatch(deleteFavoriteProductInProject(idProject, idProdName));
    setTimeout(() => {
      dispatch(fetchFavorites(3999));
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchProjectsCustomer(3999));
  }, []);

  const objetoExisteEnArray = (array, ProdNameID, idProjects) => {
    if (Array.isArray(array)) {
      return array.some(
        (obj) => obj.ProdNameID === ProdNameID && obj.idProjects === idProjects
      );
    }
  };

  return (
    <>
      <Box w={"full"} display={"flex"} zIndex={20} justifyContent={"end"}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={IconButton}
                variant="unstyled"
                pr="15px"
                fontSize="34px"
                color="#E47424"
                onMouseEnter={() => setBgHeart(true)}
                onMouseLeave={() => setBgHeart(false)}
              >
                {isOpen ? (
                  <PiHeartStraightFill />
                ) : bgHeart ? (
                  <PiHeartStraightFill />
                ) : (
                  <PiHeartStraightThin />
                )}
              </MenuButton>
              <MenuList
                display={"flex"}
                width={"260px"}
                minHeight={"325px"}
                maxHeight={"325px"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0.4vw",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#E47424",
                    borderRadius: "5px",
                  },
                }}
                zIndex={21}
                flexDir={"column"}
              >
                {customerProjects.length &&
                  customerProjects.map((el) => {
                    const favorite = objetoExisteEnArray(
                      favorites,
                      ProdNameID,
                      el.idProjects
                    );
                    return (
                      <MenuItem
                        fontSize={"0.7rem"}
                        width={"full"}
                        onClick={() =>
                          favorite
                            ? handleDelete(el.idProjects, ProdNameID)
                            : handleSubmit(el.idProjects)
                        }
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        {el.ProjectName}
                        {favorite === true ? (
                          <PiHeartStraightFill />
                        ) : (
                          <PiHeartStraightThin />
                        )}
                      </MenuItem>
                    );
                  })}
                <MenuDivider />
                <MenuItem
                  fontSize={"0.8rem"}
                  display={"flex"}
                  alignItems={"start"}
                  w={"full"}
                >
                  <CreateNewProject
                    CustomerID={3999}
                    postProductProject={true}
                    ProdNameID={ProdNameID}
                  />
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    </>
  );
}
