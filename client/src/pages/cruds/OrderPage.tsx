import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchOrders, removeOrder, updateOrder} from "../../http/orderAPI";
import {TDocs} from "../../types/serverData";
import {Container, Row} from "react-bootstrap";
import * as yup from 'yup'
import {FormikValues} from 'formik';
import {ADMIN_ROUTE, CRUD_ORDERS} from "../../utils/consts"
import CrudForm from "../../components/CrudForm"
import {TOrderData, TOrderProducts} from "../../types/orderData"

const schema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  phone: yup.number().required().min(9),
  deliveryAddress: yup.string().required(),
  email: yup.string().email().required(),
  productItems: yup.array().of(
    yup.object().shape({
      idProd: yup.string().required(),
      quantity: yup.number().required(),
      price: yup.number().required()
    })
  ),
})

export type TOrderPage = {
  firstName: string | undefined,
  secondName: string | undefined,
  phone: number | undefined,
  deliveryAddress: string | undefined,
  email: string | undefined,
  productItems: string | undefined
}

const OrderPage = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TOrderPage>({firstName: '', secondName: '', phone: 0, deliveryAddress: '', email: '', productItems: ''})

  useMemo(() => {
    if (data) {
      setInitialValues({
        firstName: String(data.firstName),
        secondName: String(data.secondName),
        phone: Number(data.phone),
        deliveryAddress: String(data.deliveryAddress),
        email: String(data.email),
        productItems: JSON.stringify(data.productItems)
      })
    }
  }, [data])

  useEffect(() => {
    fetchOrders(`_id=${id}`).then(data => setData(data.docs[0]))
  }, [])


  const updateHandler = (items: FormikValues) => {
    updateOrder(id, items as TOrderData).then((data => console.log(data)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_ORDERS)
  }

  const removeHandler = () => {
    removeOrder(id).then((response => console.log(response)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_ORDERS)
  }

  return (
    <Container>
      <Row>
        <h1>Type Tag</h1>
      </Row>
      <Row>
        {
          data &&
          <CrudForm
            schema={schema}
            initialValues={initialValues}
            updateHandler={updateHandler}
            removeHandler={removeHandler}
          />
        }
      </Row>
    </Container>
  );
};

export default OrderPage;
