export interface IAppState {
    showMenu: string;
    setShowMenu: (menu: string) => void;
    userLog: boolean;
    setUserLog: (userLog: boolean) => void;
    isCartModalOpen: boolean;
    setIsCartModalOpen: (isCartModalOpen: boolean) => void;
  }
  