import React, {FC, useContext} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CHECKOUT_ROUTE} from "../utils/consts";
import {CartStateContext} from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import CartSubmitSkeleton from "./CartSubmitSkeleton";
import {getStorageItem} from "../utils/storageFunctions";

export type TCartSubmit = {
  totalPrice: number,
  onHide?: () => void | undefined
}

const CartSubmit: FC<TCartSubmit> = ({totalPrice, onHide}) => {
  const navigate = useNavigate()
  const cart = useContext(CartStateContext)
  const isCart = getStorageItem('cart')

  return (
    <>
      {
        cart.length !== 0 && totalPrice !== 0
          ?
          <Card border={'danger'} style={{backgroundColor: 'rgba(0,160,70,.1)'}}>
            <Card.Body>
              <Container className="px-0">
                <Row className="d-flex align-items-center">
                  <Col>
                    <Card.Title className="mb-0 fs-2">
                      {totalPrice} $
                    </Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="success"
                      size={"lg"}
                      onClick={() => {
                        navigate(CHECKOUT_ROUTE)
                        {
                          onHide && onHide()
                        }
                      }}
                    >Checkout</Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          :
          isCart && <CartSubmitSkeleton/>
      }
    </>
  );
};

export default CartSubmit;