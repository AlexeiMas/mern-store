import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"
import {fetchProductData} from "../http/productAPI"
import {TDocs} from "../types/serverData"
import {Button, ButtonGroup, Card, Col, Container, Form, Image, Row} from "react-bootstrap"
import {CartStateContext, CartDispatchContext} from '../context/CartContext'
import {getStorageItem, setItemCart} from "../utils/storageFunctions";
import CartModal from "../components/CartModal";

const ProductPage = () => {
  const {pathname} = useLocation()
  const slug = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [product, setProduct] = useState<TDocs>()
  const [inCart, setInCart] = useState<boolean>(false)
  const [cartShow, setCartShow] = useState<boolean>(false)
  const cart = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)

  useEffect(() => {
    fetchProductData(slug).then(data => setProduct(data))
  }, [])

  useMemo(() => {
    if (product && cart) {
      setInCart(cart.some(item => item.id === product._id))
    }
  }, [product, cart])

  const addToCart = () => {
    (product) &&
    setItemCart(product._id, 1)
    setInCart(true)
    dispatch(getStorageItem('cart')!)
  }

  const modalCart = (
    <CartModal
      show={cartShow}
      onHide={() => setCartShow(false)}
    />
  )

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
            </Card.Body>
            <Card.Footer style={{backgroundColor: "white"}}>
              <Row>
                <Col className="d-flex justify-content-evenly align-items-center">
                  <Card.Title className="fs-1 mb-0">{Number(product.price)} $</Card.Title>
                </Col>
                <Col className="text-center">
                  {
                    inCart ?
                      <Button variant="outline-success" size="lg" onClick={() => setCartShow(true)}>
                        <i className="bi bi-cart4"/>
                        <span className="ms-1">In cart</span>
                      </Button>
                      :
                      <Button variant="success" size="lg" onClick={() => addToCart()}>
                        <i className="bi bi-cart4"/>
                        <span className="ms-1">Add to cart</span>
                      </Button>
                  }
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      }
      {modalCart}
    </Container>
  );
};

export default ProductPage;
