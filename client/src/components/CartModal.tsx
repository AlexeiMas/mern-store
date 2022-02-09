import React, {FC} from 'react';
import {Button, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
import {CHECKOUT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import CartItem from "./CartItem";

export type TCartControl = {
  show: boolean,
  onHide: () => void
}

const CartModal: FC<TCartControl> = ({show, onHide}) => {
  const navigate = useNavigate()

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
      <Modal.Body>
        <ListGroup as="ol" numbered>
          <CartItem/>
          <CartItem/>
          <CartItem/>
        </ListGroup>
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
              <Card
                border={'danger'}
                style={{backgroundColor: 'rgba(0,160,70,.1)'}}
              >
                <Card.Body>
                  <Container className="px-0">
                    <Row className="d-flex align-items-center">
                      <Col>
                        <Card.Title className="mb-0 fs-2">
                          1665 $
                        </Card.Title>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Button
                          variant="success"
                          size={"lg"}
                          onClick={() => {
                            navigate(CHECKOUT_ROUTE)
                            onHide()
                          }}
                        >Checkout</Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;