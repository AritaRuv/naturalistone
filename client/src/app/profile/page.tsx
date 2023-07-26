"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useEffect, useState } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import SideCard from "./sideCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState, User } from "@/store/login/typeLogin";
import { userInfo } from "../../store/login/actionsLogin";

export interface IShowMenu {
  setShowMenu?: React.Dispatch<React.SetStateAction<string>>;
  showMenu?: string;
  user?: User;
  isSmallThan750?: boolean;
}

export default function Profile() {
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  const [showMenu, setShowMenu] = useState<string>("");
  const dispatch = useAppDispatch();
  const [isSmallThan750] = useMediaQuery("(max-width: 750px)");

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  console.log("soy user", user);
  useEffect(() => {
    dispatch(userInfo());
  }, []);

  return (
    <>
      <NavBar />
      <Box
        px={"5vw"}
        py={isSmallThan750 ? "4vh" : "10vh"}
        display={"flex"}
        flexDir={isSmallThan750 ? "column" : "row"}
      >
        <UserMenu
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          isSmallThan750={isSmallThan750}
        />
        <Box display={"flex"}>
          {showMenu === "Profile" && (
            <>
              <ProfileInfo
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                user={user}
                isSmallThan750={isSmallThan750}
              />
            </>
          )}
          {showMenu === "Address" && (
            <>
              {/* <ProfileInfo
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                user={user}
              /> */}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
