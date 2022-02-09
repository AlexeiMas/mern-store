import {$host} from "./index";

export const createPayment = async () => {
  const {data} = await $host.post(`/api/payment`)
  return data
}