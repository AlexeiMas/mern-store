export type TCartItem = { id: string, quantity: number }

export const getStorageItem = (itemKey: string): TCartItem[] | undefined => {
  const item = localStorage.getItem(itemKey)
  if (item) {
    return JSON.parse(item)
  }
  return undefined
}

export const setItemCart = (id: TCartItem['id'], quantity: TCartItem['quantity']) => {
  const cartStore = localStorage.getItem('cart')
  if (!cartStore) {
    return localStorage.setItem('cart', JSON.stringify([{id, quantity}]))
  }
  let current = JSON.parse(cartStore)
  const findById = current.find((item: TCartItem) => item.id === id)
  if (findById) {
    current = current.map((item: TCartItem) =>
      (item.id === id) ? {...item, quantity: item.quantity + quantity} : item
    )
  } else {
    current.push({id, quantity})
  }
  localStorage.setItem('cart', JSON.stringify(current));
}

export const removeItemCart = (itemKey: string): void | undefined => {
  const item = localStorage.getItem(itemKey)
  if (item) {
    localStorage.removeItem(itemKey)
  }
  return undefined
}