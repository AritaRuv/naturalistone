export interface SignUp {
  fullName?: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  CustomerID: number;
  Contact_Name: string;
  Company?: string;
  Username: string;
  Customer_LoginID: number;
  Phone?: string;
  Address?: string;
  State?: string;
  Password?: string;
  ZipCode?: string;
  Billing_Address?: string;
  Billing_State?: string;
  City?: string;
  Company_Position?: string;
  Billing_ZipCode?: string;
  Billing_City?: string;
}

export interface SignIn {
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
}

export interface PostSigninActions {
  type: LoginActionsType.POST_SIGNIN;
  payload: SignIn;
}

export interface GetUserInfoActions {
  type: LoginActionsType.GET_USER_INFO;
  payload: User;
}

export interface UpdateUserInfoActions {
  type: LoginActionsType.UPDATE_USER;
  payload: User;
}

export type LoginAction =
  | PostSigninActions
  | GetUserInfoActions
  | UpdateUserInfoActions;
