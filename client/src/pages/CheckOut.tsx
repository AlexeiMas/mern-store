import React from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import CheckOutItem from "../components/CheckOutItem";
import CheckOutForm from "../components/CheckOutForm";
import CheckOutResume from "../components/CheckOutResume";

const CheckOut = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Card
        bg={'light'}
        text={'dark'}
        style={{width: '70%'}}
        className="mb-2"
      >
        <Card.Header className="fs-2">Checkout</Card.Header>
        <Card.Body>
          <Card.Title> Fill data of your order </Card.Title>
          <Container>
            <Row>
              <Col>
                <CheckOutForm/>
                <Card.Text className="fs-4">Order:</Card.Text>
                <Table responsive="sm">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total price</th>
                  </tr>
                  </thead>
                  <tbody>
                    <CheckOutItem/>
                    <CheckOutItem/>
                    <CheckOutItem/>
                  </tbody>
                </Table>
              </Col>
              <Col md={4}>
                <CheckOutResume/>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckOut;