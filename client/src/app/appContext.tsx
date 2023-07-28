// appContext.tsx
import React, { createContext, useState } from "react";

export interface IAppState {
  showMenu: string;
  setShowMenu: (menu: string) => void;
}

export const AppContext = createContext<IAppState | null>(null);

type ProvidersProps = {
    children: React.ReactNode;
  };
  

export const AppProvider: React.FC<ProvidersProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState<string>("");

  const updateShowMenu = (menu: string) => {
    setShowMenu(menu);
  };

  const appState: IAppState = {
    showMenu,
    setShowMenu: updateShowMenu,
  };

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  );
};

