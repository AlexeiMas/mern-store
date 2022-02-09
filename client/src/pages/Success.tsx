import React from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {HOME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Success = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={8} className="text-center">
          <Row>
            <Image src="/assets/success.jpg" style={{objectFit: 'cover', objectPosition: 'center'}}/>
          </Row>
          <h2>Your payment is Successfull</h2>
          <h5>Thank you for your payment. An automated payment receipt will be sent to your registered email.</h5>
          <Button
            className='mt-2'
            variant="outline-success"
            onClick={() => navigate(HOME_ROUTE)}
          >Back to home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;