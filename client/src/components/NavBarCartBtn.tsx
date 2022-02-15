import React, {useContext, useState} from 'react';
import {CANCEL_ORDER, CHECKOUT_ROUTE, SUCCESS_ORDER} from "../utils/consts";
import {Badge, Button} from "react-bootstrap";
import {CartStateContext} from "../context/CartContext";
import {useLocation} from "react-router-dom";
import CartModal from "./CartModal";

const NavBarCartBtn = () => {
  const {pathname} = useLocation()
  const cart = useContext(CartStateContext)
  const [cartShow, setCartShow] = useState<boolean>(false)

  const modalCart = (
    <CartModal
      show={cartShow}
      onHide={() => setCartShow(false)}
    />
  )

  return (
    <>
      <Button
        variant="outline-secondary"
        className="d-flex align-items-center position-relative"
        disabled={[CHECKOUT_ROUTE, SUCCESS_ORDER, CANCEL_ORDER].includes(pathname)}
        onClick={() => setCartShow(true)}
      >
        <i className="bi bi-cart4"/>
        <span className="ms-1">Cart</span>
        {cart.length !== 0 &&
        <Badge
            bg="secondary"
            className="position-absolute"
            style={{top: '-5px', right: '-12px'}}
            pill={true}
        >
          {cart.reduce((acc, el) => acc + el.quantity, 0)}
        </Badge>
        }
      </Button>
      {modalCart}
    </>
  );
};

export default NavBarCartBtn;