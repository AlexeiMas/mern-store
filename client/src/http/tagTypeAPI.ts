import {$host} from "./index";

export const fetchTagTypes = async () => {
  const {data} = await $host.get('/api/tagType/getAll/pagination=false')
  return data
}