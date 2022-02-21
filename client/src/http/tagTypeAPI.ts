import {$authHost, $host} from "./index";

export const fetchTagTypes = async (options: string = '') => {
  const {data} = await $host.get(`/tagType/getAll/${options}`)
  return data
}

export const authFetchTagType = async (options: string = '') => {
  const {data} = await $authHost.get(`/admin/tagType/getAll/${options}`)
  return data
}