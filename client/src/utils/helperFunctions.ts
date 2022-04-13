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

export const toEqualsLen = ([...nums]: number[], convertTo?: 'minLen' | 'maxLen'): number[] => {
  if (!convertTo || convertTo === "minLen") {
    const min = nums.reduce((acc, el): number => {
      return (el.toString().length < acc.toString().length || acc === 0) ? el.toString().length : acc
    }, 0)
    return nums.map(item => Number(item.toString().slice(0, min)))
  } else {
    const max = nums.reduce((acc, el): number => {
      return (el.toString().length > acc.toString().length) ? el.toString().length : acc
    }, 0)
    return nums.map(item => {
      if (item.toString().length < max) {
        const temp = item.toString();
        const difference = max - temp.length;
        return Number(temp.concat('0'.repeat(difference)))
      } else
        return item
    })
  }
}
