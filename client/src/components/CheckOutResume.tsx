import React from 'react';
import {Button, Card} from "react-bootstrap";
import {createPayment} from "../http/paymentAPI";

const CheckOutResume = () => {

  const checkout = async () => {
    await createPayment().then(data => window.location.href=data.url)
  }

  return (
    <Card
      border={'danger'}
      style={{backgroundColor: 'rgba(0,160,70,.1)'}}
    >
      <Card.Header>
        <Card.Title>Total:</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="d-flex mb-3">
          <div style={{color: '#797878'}}>3 products on price</div>
          <div className="ms-auto">1665 $</div>
        </div>
        <Card.Subtitle className="d-flex py-2 align-items-center" style={{borderTop: '1px solid red'}}>
          <div style={{color: '#797878'}}>For payment:</div>
          <div className="ms-auto fs-4">1665 $</div>
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="d-grid">
        <Button
          variant="success"
          size="lg"
          onClick={() => checkout()}
        >
          CHECKOUT
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CheckOutResume;