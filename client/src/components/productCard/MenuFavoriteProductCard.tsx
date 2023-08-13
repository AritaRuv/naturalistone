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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  PiPlusThin,
  PiHeartStraightThin,
  PiHeartStraightFill,
} from "react-icons/pi";

export function MenuFavoriteProductCard() {
  const CustomerID = 1938;
  const dispatch = useAppDispatch();
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects
  );
  const [bgHeart, setBgHeart] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectsCustomer(CustomerID));
  }, []);

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
                pl={"15px"}
              >
                {customerProjects &&
                  customerProjects.map((el) => (
                    <MenuItem fontSize={"0.7rem"}>{el.ProjectName}</MenuItem>
                  ))}
                <MenuDivider />
                <MenuItem icon={<PiPlusThin />} fontSize={"0.8rem"}>
                  CREATE PROJECT
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Box>
    </>
  );
}
