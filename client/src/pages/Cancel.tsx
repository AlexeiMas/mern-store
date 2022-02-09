import React from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {HOME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={8} className="text-center">
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Image src="/assets/cancel.png" style={{objectFit: 'cover', objectPosition: 'center'}} width={'100%'}/>
            </Col>
          </Row>
          <h2>Failed :(</h2>
          <h5>Your payment was processed unsuccessfully</h5>
          <Button
            className='mt-2'
            variant="outline-danger"
            onClick={() => navigate(HOME_ROUTE)}
          >Back to home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cancel;