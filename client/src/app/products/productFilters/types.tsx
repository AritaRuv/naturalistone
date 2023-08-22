
export interface FilterButtonsProps {
  setShowMenu: (menu: string) => void;
  showMenu: string
  setFilters: (filters: Filters) => void;
  filters: Filters;
}

// En el archivo types.ts o donde tengas definidos los tipos
export interface Filters {
  material: string;
  type: string[];
  finish: string[];
  thickness: string[];
  size: string[];
  orderBy: string;
}


export interface UniqueFilter {
  type?: string[]
  finish?: string[];
  thickness?: string[];
  size?: string[];
  handleCheckboxChange: (filterName: string, value: string) => void;
}

export interface FiltersState {
  setFilters: (filters: Filters) => void;
  filters: Filters;
  handleCheckboxChange: (filterName: string, value: string) => void;
}
