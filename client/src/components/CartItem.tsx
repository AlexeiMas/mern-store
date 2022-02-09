import React from 'react';
import {Button, Col, Container, Form, Image, ListGroup, Row} from "react-bootstrap";

const CartItem = () => {
  return (
    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col>
            <Image
              width={40}
              height={40}
              thumbnail
              src={'https://content.rozetka.com.ua/goods/images/big/37399220.jpg'}
              style={{objectFit: "cover"}}
            />
          </Col>
          <Col md={6}>
            <div className="fw-bold">Subheading</div>
          </Col>
          <Col>
            <Form.Control
              min={1}
              type="number"
              defaultValue={1}
              id="quantity"
              name="product"
              aria-describedby="Quantity of product"
              style={{width: '4.5rem'}}
            />
          </Col>
          <Col className="d-flex justify-content-end">
            <h5 className="mb-0">555 $</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-primary" size={"sm"}>
              <i className="bi bi-trash"/>
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
};

export default CartItem;