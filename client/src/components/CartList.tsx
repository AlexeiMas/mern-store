import React, {FC, useContext} from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {removeStorageItem, TCartItem} from "../utils/storageFunctions";
import CartItem from "./CartItem";
import CartDummy from "./CartDummy";
import {CartDispatchContext, CartStateContext} from "../context/CartContext";
import {TProductItems} from "../types/serverData";
import CartItemSkeleton from "./CartItemSkeleton";

export type TCartList = {
  products: TProductItems[] | undefined
}

const CartList: FC<TCartList> = ({products}) => {
  const cart = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)

  return (
    <Container>
      {
        cart.length !== 0 &&
        <Row>
            <Col className="d-flex">
                <Button
                    disabled={!products}
                    className="ms-auto my-1"
                    style={{width: "fit-content"}}
                    variant={"link"}
                    onClick={() => {
                      removeStorageItem('cart')
                      dispatch([])
                    }}
                >Remove all</Button>
            </Col>
        </Row>
      }
      <Row>
        <Col>
          {
            cart.length !== 0
              ?
              <ListGroup as="ol" numbered className="pe-0">
                {cart && products ? cart.reduce((nodes: React.ReactNode[], item: TCartItem) => {
                    const product = products.find(product => product._id === item.id);
                    if (!product) {
                      return nodes;
                    }
                    nodes.push(
                      <CartItem
                        key={product._id}
                        id={product._id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        quantity={item.quantity}
                      />
                    );
                    return nodes
                  }, [])
                  : cart.map(({id}) =>
                    <CartItemSkeleton key={id} />
                  )

                }
              </ListGroup>
              :
              <CartDummy/>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default CartList;
