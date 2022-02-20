import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import * as yup from 'yup'
import {Formik} from 'formik'
import {useCartProducts} from "../hooks/useCartProducts"
import {createOrder} from "../http/orderAPI"
import {TOrderData, TOrderProducts} from "../types/orderData"
import {createPayment} from "../http/paymentAPI"

const schema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  phone: yup.number().required().positive().integer().min(9),
  deliveryAddress: yup.string().required(),
  email: yup.string().required().email()
});

const CheckOutForm = ({setIsValid}: React.PropsWithChildren<{setIsValid: React.Dispatch<boolean>}>) => {
  const {products} = useCartProducts()
  const [productItems, setProductItems] = useState<TOrderProducts[]>([])

  useEffect(() => {
    products && setProductItems(products.map(product => ({idProd: product._id, quantity: product.quantity, price: product.price})))
  }, [products])

  const orderHandler = (data: Omit<TOrderData, 'productItems'>) => {
    createOrder({...data, productItems}).then(data => createPayment(data._id))
  }


  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: '',
        secondName: '',
        phone: '',
        deliveryAddress: '',
        email: ''
      }}
      onSubmit={(data) => orderHandler({...data, phone: Number(data['phone'].replace('+', ''))})}
    >
      {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
        <Form id="formOrder" noValidate onSubmit={handleSubmit} onBlur={() => setIsValid(isValid)}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name={"firstName"}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={touched.firstName && !!errors.firstName}
              required type="text" placeholder="Your firstname"/>
            <Form.Control.Feedback type={"invalid"}>{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="secondName">
            <Form.Label>Second Name</Form.Label>
            <Form.Control
              name={"secondName"}
              value={values.secondName}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.secondName && !errors.secondName}
              isInvalid={touched.secondName && !!errors.secondName}
              required type="text" placeholder="Your second name"/>
            <Form.Control.Feedback type={"invalid"}>{errors.secondName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              name={"phone"}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.phone && !errors.phone}
              isInvalid={touched.phone && !!errors.phone}
              required type="tel" placeholder="0971234567"/>
            <Form.Control.Feedback type={"invalid"}>{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="deliveryAddress">
            <Form.Label>Delivery address</Form.Label>
            <Form.Control
              name={"deliveryAddress"}
              value={values.deliveryAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.deliveryAddress && !errors.deliveryAddress}
              isInvalid={touched.deliveryAddress && !!errors.deliveryAddress}
              required type="text" placeholder="Zaporozhie city, Sonorniy avenue 100"/>
            <Form.Control.Feedback type={"invalid"}>{errors.deliveryAddress}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name={"email"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
              required type="email" placeholder="user@example.com"/>
            <Form.Control.Feedback type={"invalid"}>{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default CheckOutForm;
