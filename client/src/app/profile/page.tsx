"use client";
import { Box } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useContext } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import Projects from "./projects";
import { AppContext } from "../appContext";

export interface IShowMenu {
  setShowMenu?: React.Dispatch<React.SetStateAction<string>>;
  showMenu?: string;
  site?: string
}

export default function Profile() {

  const appContext = useContext(AppContext);
  
  return (
    <>
      <NavBar />
      <Box px={"5vw"} py={"10vh"} display={"flex"} flexDir={"row"} >
        <UserMenu/>
        <Box display={"flex"}>
          {
            appContext?.showMenu === "profile" && (
              <>
                <ProfileInfo setShowMenu={appContext?.setShowMenu} showMenu={appContext?.showMenu}/>
              </>

            )
          }
          {
            appContext?.showMenu === "projects" && (
              <>
                <Projects setShowMenu={appContext?.setShowMenu} showMenu={appContext?.showMenu}/>
              </>

            )
          }        
        </Box>

      </Box>
      
    </>
  );
}
