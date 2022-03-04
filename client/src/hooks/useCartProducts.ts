import {useContext, useEffect, useState} from "react";
import {fetchProducts} from "../http/productAPI";
import {TProductItems} from "../types/serverData";
import {CartStateContext} from "../context/CartContext";

export type TProductsInCart = TProductItems & { quantity: number }

export type TUseCartProducts = {
  products: TProductsInCart[] | undefined,
  totalPrice: number
}

export const useCartProducts = (): TUseCartProducts => {
  const cart = useContext(CartStateContext)
  const [products, setProducts] = useState<TProductsInCart[]>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    let productIds;

    if (cart) {
      productIds = cart.map(item => item.id).join(',')
    }

    fetchProducts(`/pagination=false;_id=${productIds}`)
      .then(data => {
        const productsList = data.docs && data.docs.map((item: TProductItems) => ({
          ...item,
          quantity: cart.find(prod => prod.id === item._id)!.quantity
        }))
        setProducts(productsList);

        cart.length !== 0 && productsList && setTotalPrice(productsList.reduce((acc: number, el: TProductsInCart) => {
          return acc + (Number(el.price) * el.quantity)
        }, 0))
      })
  }, [cart])

  return {
    products,
    totalPrice
  }
}
