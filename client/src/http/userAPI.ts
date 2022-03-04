import {$authHost} from "./index";

export type TUserAPI = {name: string, email: string, password: string}

export const fetchUsers = async (options: string = '') => {
  const {data} = await $authHost.get(`/admin/user/getAll/${options}`)
  return data
}

export const createUser = async (fieldsData: TUserAPI) => {
  const {data} = await $authHost.post(`/admin/user/create`, fieldsData)
  return data
}

export const updateUser = async (id: string, fieldsData: TUserAPI) => {
  const {data} = await $authHost.put(`/admin/user/${id}`, fieldsData)
  return data
}

export const removeUser = async (id: string) => {
  const {data} = await $authHost.delete(`/admin/user/${id}`)
  return data
}
