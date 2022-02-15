import React from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import {HOME_ROUTE, PRODUCTS_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom"
import SearchBlock from "./SearchBlock";
import NavBarCartBtn from "./NavBarCartBtn";

const NavBar = () => {
  const navigate = useNavigate()

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
                <SearchBlock/>
              </Col>
              <Col sm={"auto"}>
                <NavBarCartBtn/>
              </Col>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
