import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {createTagType, fetchTagTypes, removeTagType, TTagTypeAPI, updateTagType} from "../../http/tagTypeAPI";
import {TDocs} from "../../types/serverData";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import * as yup from 'yup'
import {Formik, FormikValues} from 'formik';

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3)
})

const TypeTagPage = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()

  useEffect(() => {
    fetchTagTypes(`_id=${id}`).then(data => setData(data.docs[0]))
  }, [])

  const createHandler = (items: FormikValues) => {
    createTagType(items as TTagTypeAPI).then((data => console.log(data)), (reason => console.error(reason)))
  }

  const updateHandler = (items: FormikValues) => {
    updateTagType(id, items as TTagTypeAPI).then((data => console.log(data)), (reason => console.error(reason)))
  }

  const removeHandler = () => {
    removeTagType(id).then((response => console.log(response)), (reason => console.error(reason)))
  }

  return (
    <Container>
      <Row>
        <h1>Type Tag</h1>
      </Row>
      <Row>
        {data &&
        <Formik
          validationSchema={schema}
          initialValues={{
            title: data.title,
            slug: data.slug
          }}
          onSubmit={((values) => updateHandler(values))}
          // onSubmit={((values) => createHandler(values))}
        >
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="TypeTagTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name={"title"}
                  aria-autocomplete="none"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.title && !errors.title}
                  isInvalid={touched.title && !!errors.title}
                  required type="text" placeholder="Input tag type title"/>
                <Form.Control.Feedback type={"invalid"}>{errors.title}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="TypeTagSlug">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name={"slug"}
                  aria-autocomplete="none"
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.slug && !errors.slug}
                  isInvalid={touched.slug && !!errors.slug}
                  required type="text" placeholder="Input tag type slug"/>
                <Form.Control.Feedback type={"invalid"}>{errors.slug}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button variant="success" type="submit" className="me-4" disabled={!isValid}>Save</Button>
                  <Button variant="danger" onClick={() => removeHandler()}>REMOVE</Button>
                </Col>
              </Row>
            </Form>
          )
          }
        </Formik>
        }
      </Row>
    </Container>
  );
};

export default TypeTagPage;