import {$host} from "./index";
import {TOrderData} from "../types/orderData"

export const createOrder = async (dataOrder: TOrderData) => {
  const {data} = await $host.post(`/order/create`, dataOrder)
  return data
}
