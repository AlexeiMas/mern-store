import {$host} from "./index";

export const fetchTags = async (options: string = '') => {
  const {data} = await $host.get(`/api/tag/getAll/${options}`)
  return data
}