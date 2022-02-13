import React, {SetStateAction} from "react"
import {RoutesConst} from "../utils/consts"

export type TCheckerStateItem = { [key: string]: Array<string> }
export type TCheckerDispatch = (filters: TCheckerStateItem) => void

export type TFiltersProduct = {
  checkedFilters: TCheckerStateItem,
  setCheckedFilters: TCheckerDispatch
}

export type TShopFiltration = {
  checkedFilters: TCheckerStateItem,
  setCheckedFilters: TCheckerDispatch,
  fetchDataCB: (options?: string) => Promise<any>
  routeSlug: string,
  routeConst: RoutesConst,
  setProductsCount: React.Dispatch<SetStateAction<number>>
}
