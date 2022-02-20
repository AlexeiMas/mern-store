import {$host} from "./index";

export const createPayment = async (id: string) => {
  const {data} = await $host.post(`/payment`, {id})
  return data
}
