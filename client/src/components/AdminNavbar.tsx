import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {
  ADMIN_ANALYTICS,
  ADMIN_DASHBOARD,
  ADMIN_SETTINGS,
  CRUD_ORDERS, CRUD_PRODUCTS,
  CRUD_TAGS,
  CRUD_TYPE_TAGS,
  CRUD_USERS
} from "../utils/consts";

const AdminNavbar = () => {
  const rmSlash = (value: string): string => value.replaceAll('/', '')

  return (
    <Navbar
      className="align-items-start position-sticky top-0 bottom-0 start-0"
      bg={'dark'}
      variant={'dark'}
      style={{minHeight: '100vh'}}
    >
      <Container className="flex-column">
        <Navbar.Brand as={NavLink} to={rmSlash(ADMIN_DASHBOARD)} className="fs-2">Simple Store</Navbar.Brand>
        <Nav defaultActiveKey={ADMIN_DASHBOARD} className="flex-column">
          <Nav.Link as={NavLink} to={rmSlash(ADMIN_DASHBOARD)} eventKey="link-0">Dashboard</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(CRUD_USERS)} eventKey="link-1">Users CRUD</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(CRUD_TYPE_TAGS)} eventKey="link-2">Type tags CRUD</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(CRUD_TAGS)} eventKey="link-3">Tags CRUD</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(CRUD_PRODUCTS)} eventKey="link-4">Products CRUD</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(CRUD_ORDERS)} eventKey="link-5">Orders CRUD</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(ADMIN_ANALYTICS)} eventKey="link-6">Analytics</Nav.Link>
          <Nav.Link as={NavLink} to={rmSlash(ADMIN_SETTINGS)} eventKey="link-7">Settings</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
