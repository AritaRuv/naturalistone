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
import { postFavoritesProductInProject } from "@/store/favorites/actionsFavorites";
import { CreateNewProject } from "@/app/profile/addProjectModal";
import { userInfo } from "@/store/login/actionsLogin";
import { LoginState } from "@/store/login/typeLogin";

export function MenuFavoriteProductCard({ ProdNameID }) {
  const dispatch = useAppDispatch();
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects
  );
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const [bgHeart, setBgHeart] = useState(false);
  const toast = useToast();

  useEffect(() => {
    dispatch(userInfo());
  }, []);

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
      return toast({
        id: "favProductProject",
        title: "Success",
        status: "success",
        description: "The product has been successfully added to the project",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProjectsCustomer(user.CustomerID));
  }, [user]);

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
                  customerProjects.map((el) => (
                    <MenuItem
                      fontSize={"0.7rem"}
                      width={"full"}
                      onClick={() => handleSubmit(el.idProjects)}
                    >
                      {el.ProjectName}
                    </MenuItem>
                  ))}
                <MenuDivider />
                <MenuItem
                  fontSize={"0.8rem"}
                  display={"flex"}
                  alignItems={"start"}
                  w={"full"}
                >
                  <CreateNewProject
                    CustomerID={user.CustomerID}
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
