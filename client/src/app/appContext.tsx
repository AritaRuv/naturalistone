// appContext.tsx
import { IAppState } from "@/interfaces/context";
import React, { createContext, useState } from "react";


export const AppContext = createContext<IAppState | null>(null);

type ProvidersProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<ProvidersProps> = ({ children }) => {

  const [showMenu, setShowMenu] = useState<string>("");
  const [userLog, setUserLog] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);


  const updateShowMenu = (menu: string) => {
    setShowMenu(menu);
  };

  const appState: IAppState = {
    showMenu,
    setShowMenu: updateShowMenu,
    userLog,
    setUserLog,
    isCartModalOpen,
    setIsCartModalOpen
  };

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
