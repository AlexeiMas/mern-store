import React from 'react';
import {Button, Card, Col, Container, Placeholder, Row} from "react-bootstrap";

const CartSubmitSkeleton = () =>
  <Card border={'danger'} style={{backgroundColor: 'rgba(0,160,70,.1)', width: "15rem"}}>
    <Card.Body>
      <Container className="px-0">
        <Row className="d-flex align-items-center">
          <Col>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={10}/>
            </Placeholder>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="success"
              size={"lg"}
            >Checkout</Button>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>

export default CartSubmitSkeleton;