import {$host} from "./index";

export const fetchTags = async () => {
  const {data} = await $host.get('/api/tag/getAll/pagination=false')
  return data
}