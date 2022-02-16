import React, {FC, useContext, useMemo, useState} from 'react';
import {Button} from "react-bootstrap";
import CartModal from "./CartModal";
import {getStorageItem, setItemCart} from "../utils/storageFunctions";
import {TDocs} from "../types/serverData";
import {CartDispatchContext, CartStateContext} from "../context/CartContext";

export type TProductCartButton = {
  product: TDocs,
  size?: "sm" | "lg",
  isValued?: boolean
  variantBtnAdd?: 'success' | 'outline-success'
  variantBtnIn?: 'primary' | 'outline-primary'
}

const ProductCartButton: FC<TProductCartButton> = (
  {
    product,
    size,
    isValued,
    variantBtnAdd = 'outline-success',
    variantBtnIn = 'outline-primary'
  }) => {
  const cart = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)
  const [cartShow, setCartShow] = useState<boolean>(false)
  const [inCart, setInCart] = useState<boolean>(false)

  useMemo(() => {
    if (product && cart) {
      setInCart(cart.some(item => item.id === product._id))
    }
  }, [product, cart])

  const addToCart = () => {
    (product) &&
    setItemCart(product._id, 1)
    setInCart(true)
    dispatch(getStorageItem('cart')!)
  }

  const modalCart = (
    <CartModal
      show={cartShow}
      onHide={() => setCartShow(false)}
    />
  )

  return (
    <>
      {
        inCart ?
          <Button variant={variantBtnIn} size={size} onClick={() => setCartShow(true)}>
            <i className="bi bi-cart4"/>
            {isValued && <span className="ms-1">In cart</span>}
          </Button>
          :
          <Button variant={variantBtnAdd} size={size} onClick={() => addToCart()}>
            <i className="bi bi-cart4"/>
            {isValued && <span className="ms-1">Add to cart</span>}
          </Button>
      }
      {modalCart}
    </>
  );
};

export default ProductCartButton;