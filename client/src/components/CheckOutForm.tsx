import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import * as yup from 'yup'
import {Formik} from 'formik'

export type TCheckOutForm = {
  value: string
  touched: boolean
}

export type TOrderFields = {
  firstName: string,
  secondName: string,
  phone: number,
  delivery: string
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  phone: yup.number().required(),
  delivery: yup.string().required()
});

const CheckOutForm = () => {

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: '',
        secondName: '',
        phone: '',
        delivery: ''
      }}
      onSubmit={console.log}
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
        <Form id="formOrder" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name={"firstName"}
              value={values.firstName}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
              required type="text" placeholder="Your firstname"/>
            <Form.Control.Feedback type={"invalid"}>{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="secondName">
            <Form.Label>Second Name</Form.Label>
            <Form.Control
              name={"secondName"}
              value={values.secondName}
              onChange={handleChange}
              isValid={touched.secondName && !errors.secondName}
              required type="text" placeholder="Your second name"/>
            <Form.Control.Feedback>{errors.secondName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              name={"phone"}
              value={values.phone}
              onChange={handleChange}
              isValid={touched.phone && !errors.phone}
              required type="tel" placeholder="0971234567"/>
            <Form.Control.Feedback>{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="delivery">
            <Form.Label>Delivery address</Form.Label>
            <Form.Control
              name={"delivery"}
              value={values.delivery}
              onChange={handleChange}
              isValid={touched.delivery && !errors.delivery}
              required type="text" placeholder="Zaporozhie city, Sonorniy avenue 100"/>
            <Form.Control.Feedback>{errors.delivery}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default CheckOutForm;