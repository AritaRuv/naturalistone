export interface DropDownMenuProps {
    handleHome: () => void;
    active: boolean;
  }

export interface MenuProps {
  handleMenu: () => void;
}

export interface MenuDrawerProps {
  handleHome: () => void;
  smallerThan740: boolean;
}

export interface TextButtonsNavBarProps {
  menuVisible: boolean;
}
    