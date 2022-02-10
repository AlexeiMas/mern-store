import {$host} from "./index";

export const fetchTagTypes = async (options: string = '') => {
  const {data} = await $host.get(`/api/tagType/getAll/${options}`)
  return data
}