import {$authHost, $host} from "./index";

export type TTagAPI = {title: string, slug: string, tagTypeId: string}

export const fetchTags = async (options: string = '') => {
  const {data} = await $host.get(`/tag/getAll/${options}`)
  return data
}

export const createTag = async (fieldsData: TTagAPI) => {
  const {data} = await $authHost.post(`/admin/tag/create`, fieldsData)
  return data
}

export const updateTag = async (id: string, fieldsData: TTagAPI) => {
  const {data} = await $authHost.put(`/admin/tag/${id}`, fieldsData)
  return data
}

export const removeTag = async (id: string) => {
  const {data} = await $authHost.delete(`/admin/tag/${id}`)
  return data
}
