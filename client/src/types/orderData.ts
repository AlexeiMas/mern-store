export type TOrderProducts = {
  idProd: string,
  quantity: number,
  price: number
}

export type TOrderData = {
  firstName: string,
  secondName: string,
  phone: number,
  deliveryAddress: string,
  email: string,
  productItems: TOrderProducts[]
}
