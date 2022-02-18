import React, {FC} from 'react';
import {Image} from "react-bootstrap";
import {TProductsInCart} from "../hooks/useCartProducts";
import {textLengthSlicer} from "../utils/textLengthSlicer";

const CheckOutItem: FC<TProductsInCart> = ({image, title, price, quantity}) => {
  return (
    <tr>
      <td>
        <Image src={process.env.REACT_APP_API_IMG! + image} width={40} height={40} thumbnail />
      </td>
      <td>{textLengthSlicer(title)}</td>
      <td>{price} $</td>
      <td>{quantity}</td>
      <td>{price * quantity} $</td>
    </tr>
  );
};

export default CheckOutItem;