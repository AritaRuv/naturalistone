export interface Register {
  fullName?: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  CustomerID: string;
  Contact_Name: string;
  Company: string | null;
  Username: string;
  Customer_LoginID: string;
  Phone?: string;
  Address?: string;
  State?: string;
  Password?: string;
  ZipCode?: string;
  Billing_Address?: string;
  Billing_State?: string;
  City?: string;
  Company_Position?: string;
}

export interface Signin {
  email: string;
  password: string;
  token?: string;
}

export interface LoginState {
  user: User;
}

export enum LoginActionsType {
  POST_SIGNIN = "POST_SIGNIN",
  GET_USER_INFO = "GET_USER_INFO",
  UPDATE_USER = "UPDATE_USER",
  POST_REGISTER = "POST_REGISTER",
}

export interface PostSigninActions {
  type: LoginActionsType.POST_SIGNIN;
  payload: Signin;
}

export interface GetUserInfoActions {
  type: LoginActionsType.GET_USER_INFO;
  payload: User;
}

export interface UpdateUserInfoActions {
  type: LoginActionsType.UPDATE_USER;
  payload: User;
}

export interface RegisterUserInfoActions {
  type: LoginActionsType.POST_REGISTER;
  payload: object;
}

export type LoginAction =
  | PostSigninActions
  | GetUserInfoActions
  | UpdateUserInfoActions
  | RegisterUserInfoActions;
