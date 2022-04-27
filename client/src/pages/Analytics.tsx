import React, {useEffect, useMemo, useState} from 'react';
import {Card, Container, Row, Spinner} from "react-bootstrap";
import {fetchOrders} from "../http/orderAPI"
import {TOrderItems, TOrderProductItem} from "../types/serverData"
import ProductsInOrdersPlot, {TDataForPlot} from "../components/analytics/ProductsInOrdersPlot"
import OrdersPerDatePlot from "../components/analytics/OrdersPerDatePlot"

export type TAnalytics = {
  orderCount: number
  totalSum: number
  details: TOrderProductItem[]
}

const Analytics = () => {
  const [data, setData] = useState<TOrderItems[]>()
  const [dataForPlot, setDataForPlot] = useState<TDataForPlot>({x: [], y: []})
  const [ordersPerDate, setOrdersPerDate] = useState<TDataForPlot>({x: [], y: []})
  const [analytics, setAnalytics] = useState<TAnalytics>()

  useEffect(() => {
    fetchOrders().then(data => setData(data.docs))
  }, [])

  useMemo(() => {
    if (data) {
      const filteredData = data.filter(el => el["checkPay"] === "Payed");
      const spreadAllOrders = data.map(item => item.productItems).flat(1);
      setDataForPlot(spreadAllOrders?.reduce((acc: TDataForPlot, el: TOrderProductItem) => {
        return {
          x: [...acc.x, ...Array(el.quantity).fill(el.idProd)],
          y: [...acc.y, ...Array(el.quantity).fill(el.price)]
        }
      }, {x: [], y: []}));
      const orderCount = filteredData.length;
      const totalSum = filteredData.reduce((acc: number, el) => acc += Number(el.totalPrice), 0);
      const gatheredData: TOrderProductItem[] = filteredData.map(item => item.productItems).flat(1);
      const groupBy = gatheredData.reduce((acc: TOrderProductItem[], el: TOrderProductItem) => {
        if (acc.some(item => item.idProd === el.idProd)) {
          return acc
            .map(obj => (obj.idProd === el.idProd) ? {
              ...obj,
              quantity: obj.quantity + el.quantity,
              price: obj.price + (el.price * el.quantity)
            } : obj)
        } else {
          return [...acc, el]
        }
      }, [])
      setAnalytics({orderCount, totalSum, details: groupBy});
      setOrdersPerDate(data.map(item =>
        ({
          rawDate: (item.createdDate).split('T')[0],
          day: (new Date(item.createdDate).getUTCDate()),
          month: (new Date(item.createdDate).getMonth() + 1),
          year: (new Date(item.createdDate).getFullYear())
        }))
        .reduce((acc: TDataForPlot, el) =>
            ({
              x: (!acc.x.includes(el.rawDate) ? [...acc.x, el.rawDate] : acc.x),
              y: (!acc.x.includes(el.rawDate) ? [...acc.y, 1] : (acc.y.map((item, i) => (i === acc.x.indexOf(el.rawDate)) ? item += 1 : item)))
            }),
          {x: [], y: []}
        )
      )
    }
  }, [data])

  return (
    <Container>
      <Row>
        <h1>Analytics page</h1>
      </Row>
      <Row className="mt-4">
        {data
          ?
          <>
            <Card className="mb-4">
              <Card.Header as="h5">General info</Card.Header>
              <Card.Body>
                <div className={"d-flex align-items-center"}>
                  <Card.Title style={{marginBottom: 0}}>Total profit (in $):</Card.Title>
                  <p className={"fs-2 mb-0 fw-bolder ms-auto"}>{analytics && analytics.totalSum}</p>
                </div>
                <hr/>
                <div className={"d-flex align-items-center"}>
                  <Card.Title style={{marginBottom: 0}}>Total orders count:</Card.Title>
                  <p className={"fs-2 mb-0 fw-bolder ms-auto"}>{analytics && analytics.orderCount}</p>
                </div>
              </Card.Body>
            </Card>
            <ProductsInOrdersPlot x={dataForPlot.x} y={dataForPlot.y}/>
            <OrdersPerDatePlot x={ordersPerDate.x} y={ordersPerDate.y}/>
          </>
          :
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      </Row>
    </Container>
  );
};

export default Analytics;
