import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "../components/NavBar";
import CartContext from "../context/CartContext";
import {Breadcrumb, Container, Row} from "react-bootstrap";
import styles from './style.module.css'

const Shop = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const filteredCrumbs = pathname.split('/').filter(item => item !== '' && !item.includes('='))

  return (
    <CartContext>
      <NavBar/>
      <Container>
        <Row className="pt-2">
          <Breadcrumb className="ms-2" title='Catalog'>
            <Breadcrumb.Item onClick={() => navigate('/')} style={{filter: "brightness(0.5)"}} className={styles.textDecoration}>
              <i className="bi bi-house-fill"/>
              <span className="ms-1">Home</span>
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
                    style={{filter: "brightness(0.5)"}}
                    className={styles.textDecoration}
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
    </CartContext>
  );
};

export default Shop;
