import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useCartProducts} from "../hooks/useCartProducts";
import CartList from "../components/CartList";
import CartSubmit from "../components/CartSubmit";

const Cart = () => {
  const {products, totalPrice} = useCartProducts()

  return (
    <Container>
      <Row>
        <h2>Cart</h2>
        <CartList products={products}/>
        <Container>
          <Row className="py-3 ms-auto" style={{width: "fit-content"}}>
            <Col className="ms-auto">
              <CartSubmit totalPrice={totalPrice}/>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Cart;