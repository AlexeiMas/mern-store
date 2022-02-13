import React, {useState} from 'react';
import {Button, Col, Container, FormControl, InputGroup, Navbar, Row} from "react-bootstrap";
import {CANCEL_ORDER, CHECKOUT_ROUTE, HOME_ROUTE, PRODUCTS_ROUTE, SEARCH_ROUTE, SUCCESS_ORDER} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom"
import CartModal from "./CartModal";

const NavBar = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [cartShow, setCartShow] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const onSearchHandler = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    if (search.trim() === '') {
      return event.preventDefault()
    }
    navigate(SEARCH_ROUTE + '/title=' + search)
    setSearch('')
  }

  const modalCart = (
    <CartModal
      show={cartShow}
      onHide={() => setCartShow(false)}
    />
  )

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky={"top"}>
        <Container>
          <Row style={{width: '100%'}} className="flex-md-nowrap">
            <Col md={3} className="d-flex justify-content-md-between justify-content-center w-md-auto">
              <Navbar.Brand
                style={{cursor: "default", userSelect: "none"}}
                className="me-sm-0 me-md-1"
                onClick={() => navigate(HOME_ROUTE)}
              >SIMPLE STORE</Navbar.Brand>
              <Button
                variant="secondary"
                className="d-lg-flex align-items-center d-none"
                onClick={() => navigate(PRODUCTS_ROUTE)}
              >
                <i className="bi bi-grid-fill"/>
                <span className="ms-1">Catalog</span>
              </Button>
            </Col>
            <Col md={8} className="d-flex justify-content-between ms-auto">
              <Col sm={7}>
                <InputGroup>
                  <FormControl
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(event) =>
                      (event.key === 'Enter') && onSearchHandler(event)
                    }
                    type="search"
                    placeholder="I search ..."
                    aria-label="Search"
                    aria-describedby="search-products"
                  />
                  <Button
                    variant="outline-secondary"
                    id="search"
                    onClick={(e) => onSearchHandler(e)}
                  >
                    Search
                  </Button>
                </InputGroup>
              </Col>
              <Col sm={"auto"}>
                <Button
                  variant="outline-secondary"
                  className="d-flex align-items-center"
                  disabled={[CHECKOUT_ROUTE, SUCCESS_ORDER, CANCEL_ORDER].includes(pathname)}
                  onClick={() => setCartShow(true)}
                >
                  <i className="bi bi-cart4"/>
                  <span className="ms-1">Cart</span>
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      </Navbar>
      {modalCart}
    </>
  );
};

export default NavBar;
