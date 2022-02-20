import {$host} from "./index";
import {LOGIN_REQUEST} from "../utils/consts"

export const login = async (email: string, password: string) => {
  const response = await $host.post(`${LOGIN_REQUEST}`, {email, password})
  return response
}

export const check = async (email: string, password: string) => {
  const response = await $host.post(`${LOGIN_REQUEST}`, {email, password})
  return response
}
