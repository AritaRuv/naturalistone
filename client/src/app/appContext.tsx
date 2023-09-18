// appContext.tsx
import React, { createContext, useState } from "react";

export interface IAppState {
  showMenu: string;
  setShowMenu: (menu: string) => void;
  userLog: boolean;
  setUserLog: (userLog: boolean) => void;
}

export const AppContext = createContext<IAppState | null>(null);

type ProvidersProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<ProvidersProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState<string>("");
  const [userLog, setUserLog] = useState(false);

  const updateShowMenu = (menu: string) => {
    setShowMenu(menu);
  };

  const appState: IAppState = {
    showMenu,
    setShowMenu: updateShowMenu,
    userLog,
    setUserLog,
  };

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};
