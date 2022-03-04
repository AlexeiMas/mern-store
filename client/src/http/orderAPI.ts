import {$authHost, $host} from "./index";
import {TOrderData} from "../types/orderData"

export const createOrder = async (dataOrder: TOrderData) => {
  const {data} = await $host.post(`/order/create`, dataOrder)
  return data
}

export const fetchOrders = async (options:string = '') => {
  const {data} = await $authHost.get(`/admin/order/getAll/${options}`)
  return data
}

export const fetchOrderDataById = async (id:string = '') => {
  const {data} = await $authHost.get(`/admin/order/${id}`)
  return data
}

export const updateOrder = async (id: string, fieldsData: TOrderData) => {
  const {data} = await $host.put(`/order/${id}`, fieldsData)
  return data
}

export const removeOrder = async (id: string) => {
  const {data} = await $authHost.delete(`/admin/order/${id}`)
  return data
}
