import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom"

export type TProductItems = {
  createdDate: string,
  description: string
  image: string
  orderCounter: number
  price: number
  slug: string
  tagsIds: string[]
  title: string
  updatedDate: string
  __v: number
  _id: string
}

export type TProductItemProps = Pick<TProductItems, "title" | "description" | "price" | "image" | "slug">

const ProductItem: React.FC<TProductItemProps> = ({title, description, price, image, slug}) => {
  const navigate = useNavigate()
  return (
    <Col md={3} className="py-2">
      <Card onClick={() => navigate('/product/' + slug)}>
        <Card.Img
          height={300}
          width={200}
          variant="top"
          style={{objectFit: "cover"}}
          src={process.env.REACT_APP_API_URL! + image}
        />
        <Card.Body style={{cursor: "default"}}>
          <Card.Subtitle>{title}</Card.Subtitle>
          <Card.Text style={{height: '4.8rem', overflow: 'hidden'}}>
            {description}
          </Card.Text>
          ...
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between">
          <Card.Title className="mb-0">{price} $</Card.Title>
          <Button variant="outline-success">
            <i className="bi bi-cart4"/>
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductItem;
