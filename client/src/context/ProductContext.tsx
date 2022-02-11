import React, {useState} from "react"
import {useLocation} from "react-router-dom"
import {PRODUCTS_ROUTE} from "../utils/consts";

export type TCheckerStateItem = { [key: string]: Array<string> }
export type TCheckerDispatch = (filters: TCheckerStateItem) => void

export const ProductStateContext = React.createContext<TCheckerStateItem>({})
export const ProductDispatchContext = React.createContext<TCheckerDispatch>(console.log)

const decodeFromUrlQueriesFormat = (data: string): TCheckerStateItem => {
  // console.log('data in decodeFromUrlQueriesFormat 1');
  if (data === PRODUCTS_ROUTE) return {}

  // if (data.includes('catalog/')) {
  //   data = data.split('catalog/')[1];
  // } else {
  //   data = data.slice(1, data.length)
  // }

  // console.log('data in decodeFromUrlQueriesFormat 2');
  // console.log(data);

  return data
    .slice(1, data.length)
    .split(';')
    .map(item => item.split('='))
    .reduce((acc: { [key: string]: string[] }, item: string[]) => {
      acc[item[0]] = item[1].split(',')
      return acc
    }, {})
}

export default ({children}: React.PropsWithChildren<{}>) => {
  const {pathname} = useLocation()
  console.log(pathname)
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname))
  return (
    <ProductStateContext.Provider value={checkedFilters}>
      <ProductDispatchContext.Provider value={setCheckedFilters}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  )
}
