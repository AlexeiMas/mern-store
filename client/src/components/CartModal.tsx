import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
import {CHECKOUT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import CartItem from "./CartItem";
import {fetchProducts} from "../http/productAPI";
import {TCartItem} from "../utils/storageFunctions";
import {CartStateContext} from '../context/CartContext'
import {TDocs} from "../types/serverData";
import CartDummy from "./CartDummy";

export type TCartControl = {
  show: boolean,
  onHide: () => void
}

const CartModal: FC<TCartControl> = ({show, onHide}) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<TDocs[]>()
  const cart = useContext(CartStateContext)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    let productIds;
    if (cart) {
      productIds = cart.map(item => item.id).join(',')
    }

    fetchProducts(`/pagination=false;_id=${productIds}`)
      .then(data => {
        const products = data.docs;
        setProducts(products);

        cart.length !== 0 && products && setTotalPrice(products.reduce((acc: number, el: TDocs) => {
          return acc + (Number(el.price) * (cart.find(item => item.id === el._id)!.quantity))
        }, 0))
      })
  }, [cart])

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          cart.length !== 0
            ?
            <ListGroup as="ol" numbered>
              {cart && products && cart.reduce((nodes: React.ReactNode[], item: TCartItem) => {
                const product = products.find(product => product._id === item.id);
                if (!product) {
                  return nodes;
                }
                nodes.push(
                  <CartItem
                    key={product._id}
                    id={product._id}
                    title={String(product.title)}
                    image={String(product.image)}
                    price={Number(product.price)}
                    quantity={item.quantity}
                  />
                );
                return nodes
              }, [])}
            </ListGroup>
            :
            <CartDummy/>
        }
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row className="align-items-center">
            <Col>
              <Button
                variant="outline-secondary"
                size={"sm"}
                onClick={onHide}
              >Continue shopping</Button>
            </Col>
            <Col className="d-flex justify-content-end">
              {
                cart.length !== 0 &&
                <Card
                    border={'danger'}
                    style={{backgroundColor: 'rgba(0,160,70,.1)'}}
                >
                    <Card.Body>
                        <Container className="px-0">
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <Card.Title className="mb-0 fs-2">
                                      {totalPrice} $
                                    </Card.Title>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        variant="success"
                                        size={"lg"}
                                        onClick={() => {
                                          navigate(CHECKOUT_ROUTE)
                                          onHide()
                                        }}
                                    >Checkout</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
              }
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;