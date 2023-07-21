export interface Register {
  username: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginState {
  register: Register;
}

export enum LoginActionsType {
  POST_REGISTER = "POST_REGISTER",
}

export interface PostRegisterActions {
  type: LoginActionsType.POST_REGISTER;
  payload: Register;
}

export type LoginAction = PostRegisterActions;
