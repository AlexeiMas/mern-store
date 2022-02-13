import {RoutesConst} from "./consts"
import {TCheckerStateItem} from "../types/checkerFiltration"

export const encodeToUrlQueriesFormat = (data: TCheckerStateItem): string => {
  return Object
    .entries(data)
    .map(item => item.join('='))
    .filter(item2 => item2[item2.length - 1] !== '=')
    .join(';')
}

export const decodeFromUrlQueriesFormat = (data: string, routeSlug: RoutesConst): TCheckerStateItem => {
  let dataUpdated = data;
  if (data.includes(`${routeSlug}/`)) {
    let tempData;
    tempData = data.split('/')
    dataUpdated = tempData[tempData.length - 1]
  }

  if (data === String(routeSlug)) return {}

  return dataUpdated
    // .slice(1, data.length)
    .split(';')
    .map(item => item.split('='))
    .reduce((acc: { [key: string]: string[] }, item: string[]) => {
      acc[item[0]] = item[1].split(',')
      return acc
    }, {})
}
