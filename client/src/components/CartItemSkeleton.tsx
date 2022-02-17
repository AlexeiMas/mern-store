import React from 'react';
import {Button, ButtonGroup, Col, Container, ListGroup, Placeholder, Row} from "react-bootstrap";

const CartItem = () =>
  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
    <Container>
      <Row className="align-items-center">
        <Col>
          <Placeholder bg={'secondary'} style={{width: '40px', height: '50px'}}/>
        </Col>
        <Col md={6}>
          <Placeholder bg={'secondary'} xs={6}/>
        </Col>
        <Col>
          <ButtonGroup aria-label="quantity">
            <Button className="fw-bold" variant="outline-secondary">-</Button>
            <Placeholder bg={'secondary'} xs={12} size={'lg'}/>
            <Button className="fw-bold" variant="outline-secondary">+</Button>
          </ButtonGroup>
        </Col>
        <Col className="d-flex justify-content-end">
          <Placeholder className="mb-0" as={"h5"} bg={'secondary'} xs={5} size={'lg'}/>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-primary" size={"sm"}>
            <i className="bi bi-trash"/>
          </Button>
        </Col>
      </Row>
    </Container>
  </ListGroup.Item>

export default CartItem;
