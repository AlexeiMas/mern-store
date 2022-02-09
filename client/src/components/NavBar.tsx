import React, {useState} from 'react';
import {Button, Container, Form, FormControl, Navbar} from "react-bootstrap";
import {CANCEL_ORDER, CHECKOUT_ROUTE, HOME_ROUTE, SUCCESS_ORDER} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom"
import CartModal from "./CartModal";

const NavBar = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [cartShow, setCartShow] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const modalCart = (
    <CartModal
      show={cartShow}
      onHide={() => setCartShow(false)}
    />
  )

  const onSearchHandler = () => {
    navigate(`/title=${search}`)
  }

  // console.log(search)

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky={"top"}>
        <Container>
          <Navbar.Brand style={{cursor: "default", userSelect: "none"}} onClick={() => navigate(HOME_ROUTE)}>SIMPLE
            STORE</Navbar.Brand>
          <Form className="d-flex m-auto col-5">
            <FormControl
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="I search ..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="info" onClick={() => onSearchHandler()}>Search</Button>
          </Form>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
            disabled={[CHECKOUT_ROUTE, SUCCESS_ORDER, CANCEL_ORDER].includes(pathname)}
            onClick={() => setCartShow(true)}
          >
            <i className="bi bi-cart4"/>
            <span className="ms-1">Cart</span>
          </Button>
        </Container>
      </Navbar>
      {modalCart}
    </>
  );
};

export default NavBar;
