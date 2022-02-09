import {TUserState, UserAction, UserActionTypes} from "../../types/user";

const initialState:TUserState = {
  isAuth: false,
  user: {}
}

export const userReducer = (state = initialState, action: UserAction):TUserState => {
  switch (action.type) {
    case UserActionTypes.IS_AUTH:
      return {...state, isAuth: true}
    case UserActionTypes.NOT_AUTH:
      return {...state, isAuth: false}
    case UserActionTypes.GET_USER_DATA:
      return {...state}
    case UserActionTypes.SET_USER_DATA:
      return {...state, user: action.payload}
    default:
      return state
  }
}