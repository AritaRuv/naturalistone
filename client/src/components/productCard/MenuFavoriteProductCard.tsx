import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProjectsState } from "@/store/projects/typeProjects";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { PiHeartStraightThin, PiHeartStraightFill } from "react-icons/pi";
import {
  deleteFavoriteProductInProject,
  fetchFavorites,
  postFavoritesProductInProject,
} from "@/store/favorites/actionsFavorites";
import { CreateNewProject } from "@/app/profile/addProjectModal";

export function MenuFavoriteProductCard({
  ProdNameID,
  favorites,
  user,
  dropDownZIndex,
}) {
  const dispatch = useAppDispatch();
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects
  );

  const [bgHeart, setBgHeart] = useState(false);

  const handleSubmit = async (idProject: number) => {
    await dispatch(postFavoritesProductInProject(idProject, ProdNameID));
    return dispatch(fetchFavorites(user?.CustomerID));
  };

  const handleDelete = async (idProject: number, idProdName: number) => {
    dispatch(deleteFavoriteProductInProject(idProject, idProdName));
    setTimeout(() => {
      dispatch(fetchFavorites(user?.CustomerID));
    }, 1000);
  };

  const objetoExisteEnArray = (array, ProdNameID, idProjects) => {
    if (Array.isArray(array)) {
      return array.some(
        (obj) => obj.ProdNameID === ProdNameID && obj.idProjects === idProjects
      );
    }
  };

  return (
    <>
      <Box
        w={"full"}
        display={"flex"}
        position={"absolute"}
        zIndex={dropDownZIndex > 5 ? 15 : 0}
        justifyContent={"end"}
      >
        <Menu closeOnSelect={false}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={IconButton}
                variant="unstyled"
                pr="20px"
                pt={"10px"}
                fontSize="34px"
                color={"logo.orange"}
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
                bg={"site.lightGrey"}
                display={"flex"}
                w={"260px"}
                h={"322px"}
                rounded={"none"}
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
                zIndex={15}
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
                        fontSize={"0.8rem"}
                        width={"full"}
                        bg={"site.lightGrey"}
                        alignContent={"center"}
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
                          <PiHeartStraightFill
                            style={{ color: "#E47424" }}
                            fontSize={"20px"}
                          />
                        ) : (
                          <PiHeartStraightThin fontSize={"20px"} />
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
                  bg={"site.lightGrey"}
                >
                  <CreateNewProject
                    CustomerID={user?.CustomerID}
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
