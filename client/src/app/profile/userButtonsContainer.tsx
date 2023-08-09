"use client";
import {
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import Link from "next/link";
import { AppContext } from "../appContext";
import { useContext } from "react";

const UserButtonsContainer: React.FC<IShowMenu> = ({
  site
}) => {


  const appContext = useContext(AppContext);

  const handleClick = (e) => {
    const { name } = e.target;
    appContext?.setShowMenu(name);
  };

  const userButtonsArray = [
    { name: "profile" },
    { name: "address" },
    { name: "projects" },
    { name: "favorites" },
    { name: "log out" },
  ];

  return (
    <>
      <VStack spacing={5} alignItems={"flex-start"} w={"10vw"} mt={"30px"}>
        {userButtonsArray.map((button, i) => {
          return (
            <Box key={i}>
              {
                site === "navbar" ? (
                  <Link href={site === "navbar" ? "/profile" : ""}>
                    <Button
                      borderLeft={
                        site === "navbar"
                          ? "unset"
                          : appContext?.showMenu === button.name
                            ? "3px solid black"
                            : "unset"
                      }
                      _hover={{
                        fontWeight: "semibold",
                      }}
                      rounded={0}
                      h={"4vh"}
                      onClick={handleClick}
                      pl={"2vw"}
                      fontSize="0.9rem"
                      variant="unstyled"
                      fontWeight={"normal"}
                      name={button.name}
                      textTransform={"uppercase"}
                    >
                      {button.name}
                    </Button>
                  </Link>
                ):(
                  <Button
                    borderLeft={
                      site === "navbar"
                        ? "unset"
                        : appContext?.showMenu === button.name
                          ? "3px solid black"
                          : "unset"
                    }
                    _hover={{
                      fontWeight: "semibold",
                    }}
                    rounded={0}
                    h={"4vh"}
                    onClick={handleClick}
                    pl={"2vw"}
                    fontSize="0.9rem"
                    variant="unstyled"
                    fontWeight={"normal"}
                    name={button.name}
                    textTransform={"uppercase"}
                  >
                    {button.name}
                  </Button>
                )
              }

            </Box>
          );
        })}
      </VStack>
    </>
  );
};

export default UserButtonsContainer;
