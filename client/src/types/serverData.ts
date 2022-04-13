export type TDocs = {
  _id: string
  [key: string]: string | number | Array<string>
}

export type TProductItems = {
  createdDate: string,
  description: string
  image: string
  orderCounter: number
  price: number
  slug: string
  tagsIds: string[]
  title: string
  updatedDate: string
  __v: number
  _id: string
}

export type TServerData = {
  docs: TProductItems[],
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number | null
  page: number
  pagingCounter: number
  prevPage: number | null
  totalDocs: number
  totalPages: number
}

export type TOrderProductItem = {
  _id: string
  idProd: string,
  quantity: number
  price: number
}

export type TOrderItems = {
  checkPay: string
  createdDate: string
  deliveryAddress: string
  email: string
  firstName: string
  phone: number
  productItems: TOrderProductItem[]
  secondName: string
  slug: number
  totalPrice: number
  updatedDate: string
  _id: string
}

export type TResponseDataWithArrays = Omit<TServerData, 'docs'> & {docs: TDocs[]}
export type TResponseData = Omit<TServerData, 'docs'> & {docs: {_id: string, [key: string]: string | number}[]}
