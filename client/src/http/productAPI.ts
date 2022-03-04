import {$authHost, $host} from "./index";

export type TProductAPI = {title: string, price: number, description: string, tagsIds: string, slug: string}

export const fetchProducts = async (options:string = '') => {
  const {data} = await $host.get(`/product/getAll${options}`)
  return data
}

export const fetchProductData = async (slug:string = '') => {
  const {data} = await $host.get(`/product/${slug}`)
  return data
}

export const fetchProductDataById = async (id:string = '') => {
  const {data} = await $authHost.get(`/admin/product/${id}`)
  return data
}

export const createProduct = async (fieldsData: TProductAPI) => {
  const {data} = await $authHost.post(`/admin/product/create`, fieldsData)
  return data
}

export const updateProduct = async (id: string, fieldsData: TProductAPI) => {
  const {data} = await $authHost.put(`/admin/product/${id}`, fieldsData)
  return data
}

export const removeProduct = async (id: string) => {
  const {data} = await $authHost.delete(`/admin/product/${id}`)
  return data
}
