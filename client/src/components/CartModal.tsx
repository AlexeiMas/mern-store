import React, {FC} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import CartList from "./CartList";
import CartSubmit from "./CartSubmit";
import {useCartProducts} from "../hooks/useCartProducts";

export type TCartControl = {
  show: boolean,
  onHide: () => void
}

const CartModal: FC<TCartControl> = ({show, onHide}) => {
  const {products, totalPrice} = useCartProducts()

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <CartList products={products}/>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row className="align-items-center">
            <Col>
              <Button
                variant="outline-secondary"
                size={"sm"}
                onClick={onHide}
              >Continue shopping</Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <CartSubmit totalPrice={totalPrice} onHide={onHide}/>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;