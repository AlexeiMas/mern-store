import {$host} from "./index";

export const fetchProducts = async (options:string = '') => {
  const {data} = await $host.get(`/product/getAll${options}`)
  return data
}

export const fetchProductData = async (slug:string = '') => {
  const {data} = await $host.get(`/product/${slug}`)
  return data
}
