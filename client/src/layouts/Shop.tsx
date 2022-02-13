import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "../components/NavBar";
import {Breadcrumb, Container, Row} from "react-bootstrap";

const Shop = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const filteredCrumbs = pathname.split('/').filter(item => item !== '' && !item.includes('='))

  return (
    <>
      <NavBar/>
      <Container>
        <Row className="pt-2">
          <Breadcrumb className="ms-2" title='Catalog'>
            <Breadcrumb.Item onClick={() => navigate('/')}>
              <i className="bi bi-house-fill"/>
            </Breadcrumb.Item>
            {filteredCrumbs.map((item, i, arr) => {
                let crumbs = item
                if (item === 'product') crumbs = 'catalog'
                return (
                  <Breadcrumb.Item
                    onClick={() => {
                      (i !== arr.length - 1) &&
                      navigate(crumbs)
                    }}
                    active={i === arr.length - 1}
                    className="text-capitalize"
                    key={item + i}
                  >
                    {crumbs.replaceAll('_', ' ')}
                  </Breadcrumb.Item>
                )
              }
            )}
          </Breadcrumb>
          <Outlet/>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
