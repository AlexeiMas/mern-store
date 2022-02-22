import {$authHost, $host} from "./index";

export type TTagTypeAPI = {title: string, slug: string}

export const fetchTagTypes = async (options: string = '') => {
  const {data} = await $host.get(`/tagType/getAll/${options}`)
  return data
}

export const createTagType = async (fieldsData: TTagTypeAPI) => {
  const {data} = await $authHost.post(`/admin/tagType/create`, fieldsData)
  return data
}

export const updateTagType = async (id: string, fieldsData: TTagTypeAPI) => {
  const {data} = await $authHost.put(`/admin/tagType/${id}`, fieldsData)
  return data
}

export const removeTagType = async (id: string) => {
  const {data} = await $authHost.delete(`/admin/tagType/${id}`)
  return data
}