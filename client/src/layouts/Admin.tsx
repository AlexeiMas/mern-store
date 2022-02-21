import React from 'react';
import {Outlet} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";

const Admin = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="ps-0">
          <AdminNavbar/>
        </Col>
        <Col className="my-4">
          <Outlet/>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;