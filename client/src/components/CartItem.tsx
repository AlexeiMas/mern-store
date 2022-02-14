import React, {FC, SetStateAction} from 'react';
import {Button, Col, Container, Form, Image, ListGroup, Row} from "react-bootstrap";

export type TCartItem = {
  image: string,
  title: string,
  quantity: number,
  setQuantity: React.Dispatch<SetStateAction<number>>,
  price: number
}

const CartItem: FC<TCartItem> = ({image, title, quantity, setQuantity, price}) => {
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
            <Form.Control
              min={1}
              max={100}
              type="text"
              inputMode="numeric"
              defaultValue={quantity}
              id="quantity"
              name="product"
              aria-describedby="Quantity of product"
              style={{width: '4rem'}}
            />
          </Col>
          <Col className="d-flex justify-content-end">
            <h5 className="mb-0">{price} $</h5>
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
