import React, {useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import CheckOutForm from "../components/CheckOutForm";
import CheckOutResume from "../components/CheckOutResume";

const CheckOut = () => {
  const [isValid, setIsValid] = useState<boolean>(false)

  return (
    <Container className="d-flex justify-content-center">
      <Card
        bg={'light'}
        text={'dark'}
        style={{width: '90%'}}
        className="mb-2"
      >
        <Card.Header className="fs-2">Checkout</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Card.Title> Fill data of your order </Card.Title>
            </Row>
            <Row>
              <Col>
                <CheckOutForm setIsValid={setIsValid} />
              </Col>
              <Col md={6}>
                <CheckOutResume isValid={isValid} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckOut;
