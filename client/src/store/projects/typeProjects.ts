// typeDimensions.ts
export interface Project {
  idProjects: number;
  ProjectName: string;
  CustomerID: number;
  Shipping_Address: string;
  Shipping_ZipCode: string;
  Shipping_State: string;
  Shipping_City: string;
}

export interface ProjectsState {
  customerProjects: Project[];
  project: Project;
}

export enum ProjectsActionsType {
  FETCH_PROJECTS_BY_CUSTOMER = "FETCH_PROJECTS_BY_CUSTOMER",
  POST_PROJECT_CUSTOMER = "POST_PROJECT_CUSTOMER",
  FETCH_PROJECT = "FETCH_PROJECT",
}

export interface FetchCustomerProjectsRequestAction {
  type: ProjectsActionsType.FETCH_PROJECTS_BY_CUSTOMER;
  payload: Project[];
}
export interface PostProjectRequestAction {
  type: ProjectsActionsType.POST_PROJECT_CUSTOMER;
  payload: Project[];
}
export interface FetchProjectRequestAction {
  type: ProjectsActionsType.FETCH_PROJECT;
  payload: Project;
}

export type ProjectsAction = FetchCustomerProjectsRequestAction 
| FetchProjectRequestAction
| PostProjectRequestAction;