import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "../components/NavBar";
import {HOME_ROUTE} from "../utils/consts";
import {Breadcrumb, Container, Row} from "react-bootstrap";

const Shop = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const filteredCrumbs = pathname.split('/').filter(item => item !== '' && !item.includes('='))
  console.log(filteredCrumbs)
  return (
    <>
      <NavBar/>
      <Container>
        <Row className="pt-2">
          <Breadcrumb className="ms-2" title='Catalog'>
            <Breadcrumb.Item onClick={() => navigate('/')}>
              <i className="bi bi-house-door"/>
            </Breadcrumb.Item>
            {filteredCrumbs.map((item, i, arr) =>
              <Breadcrumb.Item
                onClick={() => i !== arr.length - 1 && navigate(HOME_ROUTE)}
                active={i === arr.length - 1}
                className="text-capitalize"
                key={item + i}
              >
                {item.replaceAll('_', ' ')}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <Outlet/>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
