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