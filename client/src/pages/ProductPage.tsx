import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom"
import {fetchProductData} from "../http/productAPI"
import {TDocs} from "../types/serverData"
import {Button, ButtonGroup, Card, Col, Container, Form, Image, Row} from "react-bootstrap"

const ProductPage = () => {
  const {pathname} = useLocation()
  const slug = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [product, setProduct] = useState<TDocs>()
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    console.log(pathname);
    fetchProductData(slug).then(data => setProduct(data))
  }, [])

  const addToCart = () => {
    console.log("Slug product:", slug)
    // const cart = localStorage.getItem('cart')
    // if (cart) {
    //   const product = JSON.parse(cart)
    //   localStorage.setItem('cart', JSON.stringify({...product, [slug]: product[slug] + quantity}))
    // }
    // localStorage.setItem('cart', JSON.stringify([]))
    //
    // localStorage.setItem('cart', JSON.stringify({[slug]: quantity}))
    // localStorage.setItem('cartCounter', '0')
    // localStorage.getItem('cart')
    // }
  }

  return (
    <Container>
      {product &&
      <Row>
        <Col>
          <Image fluid src={process.env.REACT_APP_API_URL! + product.image}/>
        </Col>
        <Col className="h-auto">
          <Card border="light">
            <Card.Header as="h2" className="text-capitalize" style={{backgroundColor: "white"}}>
              {String(product.slug).replaceAll('_', ' ')}
            </Card.Header>
            <Card.Body style={{minHeight: '20rem'}} className="d-flex flex-column justify-content-between">
              <Card.Title as="h3">{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Row>
                <Col md={3}>
                  <ButtonGroup aria-label="quantity">
                    <Button className="fw-bold" variant="outline-secondary" disabled={quantity <= 1}
                            onClick={() => setQuantity(quantity - 1)}>-</Button>
                    <Form.Control
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value))
                      }}
                      min={1}
                      max={100}
                      type="text"
                      inputMode="numeric"
                      id="quantity"
                      aria-describedby="quantity"
                      style={{width: "4rem"}}
                    />
                    <Button className="fw-bold" variant="outline-secondary"
                            onClick={() => setQuantity(quantity + 1)}>+</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "white"}}>
              <Row>
                <Col className="d-flex justify-content-evenly align-items-center">
                  <Card.Title className="fs-1 mb-0">{product.price} $</Card.Title>
                </Col>
                <Col className="text-center">
                  <Button variant="success" size="lg" onClick={() => addToCart()}>
                    <i className="bi bi-cart4"/>
                    <span className="ms-1">Add to cart</span>
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      }
    </Container>
  );
};

export default ProductPage;
