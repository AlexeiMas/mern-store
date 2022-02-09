export type TUserState = {
  isAuth: boolean,
  user: object
}

export enum UserActionTypes {
  IS_AUTH = "IS_AUTH",
  NOT_AUTH = "NOT_AUTH",
  GET_USER_DATA = "GET_USER_DATA",
  SET_USER_DATA = "SET_USER_DATA"
}

export type TIsAuthAction = {
  type: UserActionTypes.IS_AUTH
}

export type TNotAuthAction = {
  type: UserActionTypes.NOT_AUTH
}

export type TGetUserDataAction = {
  type: UserActionTypes.GET_USER_DATA
}

export type TSetUserDataAction = {
  type: UserActionTypes.SET_USER_DATA,
  payload: {}
}

export type UserAction = TIsAuthAction | TNotAuthAction | TGetUserDataAction | TSetUserDataAction