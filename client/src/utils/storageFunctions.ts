export type TCartItem = { id: string, quantity: number }

export const getStorageItem = (itemKey: string): TCartItem[] | undefined => {
  const item = localStorage.getItem(itemKey)
  if (itemKey === 'cart' && item) {
    const cart = JSON.parse(item)
    if (cart.length === 0) {
      removeStorageItem(itemKey)
    } else {
      return cart
    }
  }
  return undefined
}

export  const getTokenItem = (itemKey: string): string | undefined => {
  const item = localStorage.getItem(itemKey)
  if (itemKey === 'token' && item) {
    return item
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
    quantity === 0 ?
      (current = current.filter((item: TCartItem) => (item.id !== id)))
      :
      (current = current.map((item: TCartItem) => (item.id === id) ? {...item, quantity} : item))
  } else {
    current.push({id, quantity})
  }
  localStorage.setItem('cart', JSON.stringify(current));
}

export const removeStorageItem = (itemKey: string): void | undefined => {
  const item = localStorage.getItem(itemKey)
  if (item) {
    localStorage.removeItem(itemKey)
  }
  return undefined
}
