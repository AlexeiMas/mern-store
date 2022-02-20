import React, {useState} from 'react';
import {Button, Card, Container, Row, Spinner} from "react-bootstrap";
import {useCartProducts} from "../hooks/useCartProducts";
import CheckOutTable from "./CheckOutTable";

const CheckOutResume = ({isValid}: React.PropsWithChildren<{ isValid: boolean }>) => {
  const {totalPrice} = useCartProducts()
  const [isClicked, setIsClicked] = useState<boolean>(false)

  // const checkout = async () => {
  //   await createPayment().then(data => window.location.href = data.url)
  // }

  return (
    <Card
      border={'rgba(0,160,70,.07)'}
      style={{backgroundColor: 'rgba(0,160,70,.05)'}}
    >
      <Card.Header>
        <Card.Title className="fs-3 mb-0">Order:</Card.Title>
      </Card.Header>
      <Card.Body>
        <CheckOutTable/>
      </Card.Body>
      <Card.Footer className="d-grid">
        <Container>
          <Row>
            <Card.Subtitle className="d-flex mt-2 mb-4 align-items-center">
              <h5 style={{color: '#797878'}}>For payment:</h5>
              {totalPrice
                ?
                <div className="ms-auto fs-2">{totalPrice} $</div>
                :
                <Spinner animation="border" role="status" className="ms-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              }
            </Card.Subtitle>
          </Row>
        </Container>
        <Button
          className="mb-3"
          variant="success"
          size="lg"
          type="submit"
          form="formOrder"
          disabled={!isValid}
          onClick={() => setIsClicked(true)}
        >
          {
            isClicked &&
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          }
          CHECKOUT
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CheckOutResume;
