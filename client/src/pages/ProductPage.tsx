import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom"
import {fetchProductData} from "../http/productAPI"
import {TDocs} from "../types/serverData"
import {Card, Col, Container, Image, Row} from "react-bootstrap"
import ProductCartButton from "../components/ProductCartButton";

const ProductPage = () => {
  const {pathname} = useLocation()
  const slug = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [product, setProduct] = useState<TDocs>()

  useEffect(() => {
    fetchProductData(slug).then(data => setProduct(data))
  }, [])

  return (
    <Container>
      {product &&
      <Row>
        <Col>
          <Image fluid src={process.env.REACT_APP_API_URL! + product.image}/>
        </Col>
        <Col className="h-auto">
          <Card border="light">
            <Card.Header as="h2" className="text-capitalize" style={{backgroundColor: "white"}}>
              {String(product.slug).replaceAll('_', ' ')}
            </Card.Header>
            <Card.Body style={{minHeight: '20rem'}} className="d-flex flex-column justify-content-between">
              <Card.Title as="h3">{product.title}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "white"}}>
              <Row>
                <Col className="d-flex justify-content-evenly align-items-center">
                  <Card.Title className="fs-1 mb-0">{Number(product.price)} $</Card.Title>
                </Col>
                <Col className="text-center">
                  <ProductCartButton product={product} size={"lg"} isValued variantBtnAdd={"success"}/>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      }
    </Container>
  );
};

export default ProductPage;
