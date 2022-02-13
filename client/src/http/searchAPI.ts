import {$host} from "./index";

export const searchByName = async (options:string = '') => {
  const {data} = await $host.get(`/api/search${options}`)
  return data
}
