import {$host} from "./index";

export const fetchTags = async (options: string = '') => {
  const {data} = await $host.get(`/tag/getAll/${options}`)
  return data
}