import React, {useEffect, useMemo, useState} from 'react';
import {Card, Container, Row, Spinner} from "react-bootstrap";
import {fetchOrders} from "../http/orderAPI"
import {TOrderItems, TOrderProductItem} from "../types/serverData"

export type TAnalytics = {
  orderCount: number
  totalSum: number
  details: TOrderProductItem[]
}

const Analytics = () => {
  const [data, setData] = useState<TOrderItems[]>()
  const [analytics, setAnalytics] = useState<TAnalytics>()

  useEffect(() => {
    fetchOrders().then(data => setData(data.docs))
  }, [])

  useMemo(() => {
    if (data) {
      const filteredData = data.filter(el => el["checkPay"] === "Payed");
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
      }, [{_id: '', idProd: '', quantity: 0, price: 0}])
      setAnalytics({orderCount, totalSum, details: groupBy})
    }
  }, [data])

  return (
    <Container>
      <Row>
        <h1>Analytics page</h1>
      </Row>
      <Row>
        {data
          ?
          <Card>
            <Card.Header as="h5">General info</Card.Header>
            <Card.Body>
              <div className={"d-flex align-items-center"}>
                <Card.Title style={{marginBottom: 0}}>Total profit (in $):</Card.Title>
                <p className={"fs-2 mb-0 fw-bolder ms-auto"}>{analytics && analytics.totalSum}</p>
              </div>
              <hr/>
              <div className={"d-flex align-items-center"}>
                <Card.Title style={{marginBottom: 0}}>Total order count:</Card.Title>
                <p className={"fs-2 mb-0 fw-bolder ms-auto"}>{analytics && analytics.orderCount}</p>
              </div>
            </Card.Body>
          </Card>
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
