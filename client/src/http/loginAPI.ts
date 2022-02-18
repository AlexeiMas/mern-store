import {$host} from "./index";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts"

export const getLogin = async () => {
  const {data} = await $host.get(`${ADMIN_ROUTE}`)
  return data
}

export const login = async (email: string, password: string) => {
  const response = await $host.post(`${LOGIN_ROUTE}`, {email, password})
  return response
}

export const check = async (email: string, password: string) => {
  const response = await $host.post(`${LOGIN_ROUTE}`, {email, password})
  return response
}
