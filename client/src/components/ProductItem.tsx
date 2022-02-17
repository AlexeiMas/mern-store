import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import ProductCartButton from "./ProductCartButton";
import {TProductItems} from "../types/serverData";
import {textLengthSlicer} from "../utils/textLengthSlicer";

export type TProductItemProps = {
  product: TProductItems
}

const ProductItem: FC<TProductItemProps> = ({product}) => {
  const navigate = useNavigate()
  return (
    <Col md={3} className="py-2">
      <Card onClick={() => navigate('/product/' + product.slug)}>
        <Card.Img
          height={300}
          width={200}
          variant="top"
          style={{objectFit: "cover"}}
          src={process.env.REACT_APP_API_URL! + product.image}
        />
        <Card.Body style={{cursor: "default"}}>
          <Card.Subtitle style={{height: '2.5rem'}}>{textLengthSlicer(product.title, 35)}</Card.Subtitle>
          <Card.Text style={{height: '4.8rem', overflow: 'hidden'}}>
            {textLengthSlicer(product.description, 55)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Card.Title className="mb-0">{product.price} $</Card.Title>
          <ProductCartButton product={product}/>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductItem;
