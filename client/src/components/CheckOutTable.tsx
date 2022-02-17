import React from 'react';
import CheckOutItem from "./CheckOutItem";
import {Spinner, Table} from "react-bootstrap";
import {useCartProducts} from "../hooks/useCartProducts";

const CheckOutTable = () => {
  const {products} = useCartProducts()

  return (
    <Table responsive="sm" className="text-center" style={{tableLayout: 'fixed'}}>
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Sum</th>
      </tr>
      </thead>
      <tbody>
      {products
        ?
        products.map((product) =>
          <CheckOutItem key={product._id} {...product}/>)
        :
        <tr>
          <td>
            <Spinner animation="border" role="status" className="mt-4">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </td>
        </tr>
      }
      </tbody>
    </Table>
  );
};

export default CheckOutTable;