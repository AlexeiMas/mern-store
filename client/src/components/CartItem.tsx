import React, {FC, useContext} from 'react';
import {Button, ButtonGroup, Col, Container, Form, Image, ListGroup, Row} from "react-bootstrap";
import {CartDispatchContext, CartStateContext} from "../context/CartContext";
import {getStorageItem, setItemCart} from "../utils/storageFunctions";

export type TCartItem = {
  id: string
  image: string,
  title: string,
  quantity: number,
  price: number
}

const CartItem: FC<TCartItem> = ({id, image, title, quantity, price}) => {
  const cart = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)

  return (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col>
            <Image
              width={40}
              height={40}
              thumbnail
              src={process.env.REACT_APP_API_URL! + image}
              style={{objectFit: "cover"}}
            />
          </Col>
          <Col md={6}>
            <div className="fw-bold">{title}</div>
          </Col>
          <Col>
            <ButtonGroup aria-label="quantity">
              <Button
                className="fw-bold"
                variant="outline-secondary"
                disabled={quantity <= 1}
                onClick={() => {
                  setItemCart(id, quantity - 1)
                  dispatch(getStorageItem('cart')!)
                }}>-</Button>
              <Form.Control
                value={quantity}
                readOnly
                min={1}
                max={100}
                type="text"
                inputMode="numeric"
                id="quantity"
                aria-describedby="quantity"
                style={{width: "4rem"}}
              />
              <Button className="fw-bold" variant="outline-secondary"
                      onClick={() => {
                        setItemCart(id, quantity + 1)
                        dispatch(getStorageItem('cart')!)
                      }}>+</Button>
            </ButtonGroup>
          </Col>
          <Col className="d-flex justify-content-end">
            <h5 className="mb-0">{price * quantity} $</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" size={"sm"} onClick={() => {
              setItemCart(id, 0)
              dispatch(cart.filter(item => item.id !== id))
            }}>
              <i className="bi bi-trash"/>
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
};

export default CartItem;
