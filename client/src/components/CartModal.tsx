import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
import {CHECKOUT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import CartItem from "./CartItem";
import {fetchProducts} from "../http/productAPI";
import {getStorageItem} from "../utils/storageFunctions";
import {CartStateContext, CartDispatchContext} from '../context/CartContext'
import {TServerData} from "../types/serverData";
import CartDummy from "./CartDummy";

export type TCartControl = {
  show: boolean,
  onHide: () => void
}

const CartModal: FC<TCartControl> = ({show, onHide}) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<TServerData>()
  const cart = useContext(CartStateContext)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useMemo(() => {
    cart.length !== 0 && products && setTotalPrice(products.docs.reduce((acc, el) => {
      return acc + (Number(el.price) * (cart.find(item => item.id === el._id)!.quantity))
    }, 0))
  }, [cart, products])

  //TODO fix problem of update products
  useEffect(() => {
    let productIds;
    if (cart) {
      productIds = cart.map(item => item.id).join(',')
    }
    fetchProducts(`/_id=${productIds}`).then(data => setProducts(data))
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
          cart.length !== 0 ?
            <ListGroup as="ol" numbered>
              {products && products.docs.map(item =>
                <CartItem
                  key={item._id}
                  id={item._id}
                  title={String(item.title)}
                  image={String(item.image)}
                  price={Number(item.price)}
                  quantity={{...cart.find(el => item._id === el.id)}.quantity!}
                />
              )}
            </ListGroup>
            : <CartDummy/>
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