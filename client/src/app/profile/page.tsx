'use client'
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useState } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import SideCard from "./sideCard";
import Projects from "./projects";

export interface IShowMenu {
  setShowMenu: React.Dispatch<React.SetStateAction<string>>;
  showMenu: string;
}

export default function Profile() {
  
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  const [showMenu, setShowMenu] = useState<string>("");
  
  return (
    <>
      <NavBar />
      <Box px={'5vw'} py={'10vh'} display={'flex'} flexDir={'row'} >
        <UserMenu setShowMenu={setShowMenu} showMenu={showMenu}/>
        <Box display={'flex'}>
        {
          showMenu === 'Profile' && (
            <>
              <ProfileInfo setShowMenu={setShowMenu} showMenu={showMenu}/>
            </>

          )
        }
                {
          showMenu === 'Projects' && (
            <>
              <Projects setShowMenu={setShowMenu} showMenu={showMenu}/>
            </>

          )
        }        
        </Box>

      </Box>
      
    </>
  );
}
