import React, {SetStateAction, useState} from 'react';
import {getStorageItem, TCartItem} from "../utils/storageFunctions";

export type TCartDispatch = React.Dispatch<SetStateAction<TCartItem[]>>

const cb: TCartDispatch = () => null

export const CartStateContext = React.createContext<TCartItem[]>([])
export const CartDispatchContext = React.createContext<TCartDispatch>(cb)

export default ({children}: React.PropsWithChildren<{}>) => {
  const [cart, setCart] = useState<Array<TCartItem>>(getStorageItem('cart') || [])
  return (
    <CartStateContext.Provider value={cart}>
      <CartDispatchContext.Provider value={setCart}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};