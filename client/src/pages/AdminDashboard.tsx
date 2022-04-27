import React, {useEffect, useMemo, useState} from 'react';
import {Container, Row} from "react-bootstrap"
import ProductsInOrdersPlot, {TDataForPlot} from "../components/analytics/ProductsInOrdersPlot"
import {fetchOrders} from "../http/orderAPI"
import {TOrderItems, TOrderProductItem} from "../types/serverData"

const AdminDashboard = () => {
  const [response, setResponse] = useState<TOrderItems[]>()
  const [dataForPlot, setDataForPlot] = useState<TDataForPlot>({x: [], y: []})

  useEffect(() => {
    fetchOrders().then(data => setResponse(data.docs))
  }, [])

  useMemo(() => {
    if (response) {
      const spreadAllOrders = response.map((item) => item.productItems).flat(1);
      setDataForPlot(spreadAllOrders?.reduce((acc: TDataForPlot, el: TOrderProductItem) => {
        return {
          x: [...acc.x, ...Array(el.quantity).fill(el.idProd)],
          y: [...acc.y, ...Array(el.quantity).fill(el.price)]
        }
      }, {x: [], y: []}));
    }
  }, [response])

  return (
    <Container>
      <Row>
        <h1>Admin Dashboard</h1>
      </Row>
      <Row className="mt-4">
        {response && <ProductsInOrdersPlot x={dataForPlot.x} y={dataForPlot.y} heightPlot={700}/>}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
