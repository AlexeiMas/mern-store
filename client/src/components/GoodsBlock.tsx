import React, {FC} from 'react';
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap"
import {TServerData} from "../types/serverData"
import {useNavigate} from "react-router-dom"

export type TGoodsBlock = {
  title: string,
  data: TServerData | undefined,
  linkLabel: string
}

const GoodsBlock: FC<TGoodsBlock> = ({title, data, linkLabel}) => {
  const navigate = useNavigate()

  return (
    <Row className="my-5">
      <h2 className="mb-3">{title}</h2>
      <Container>
        <Row>
          {data ?
            data.docs.map(item =>
              <Col key={item._id}>
                <Card onClick={() => navigate(`/${linkLabel}/` + item.slug)}>
                  <Card.Img variant="top" src={process.env.REACT_APP_API_URL! + item.image} height={180} width={200}
                            style={{objectFit: "cover"}}/>
                  <Card.Body>
                    <Card.Subtitle style={{height: '3rem', overflow: 'hidden'}}>{item.title}</Card.Subtitle>
                  </Card.Body>
                  <Card.Footer className="bg-white d-flex align-items-center"
                               onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <Card.Title className="mb-0">{item.price} $</Card.Title>
                    <Button variant="outline-success" className="ms-auto">
                      <i className="bi bi-cart4"/>
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ) :
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
        </Row>
      </Container>
    </Row>
  );
};

export default GoodsBlock;
