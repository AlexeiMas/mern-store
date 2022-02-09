export type TDocs = {
  _id: string
  [key: string]: string | number | Array<string>
}

export type TServerData = {
  docs: TDocs[],
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