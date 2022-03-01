import React, {FC} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap"
import * as yup from 'yup'
import {Formik, FormikValues} from "formik"
import TagTypeSelect from "./TagTypeSelect"

export type TCrudForm = {
  schema: yup.ObjectSchema<any>
  initialValues: { [key: string]: string | number | undefined }
  createHandler?: (items: FormikValues) => void
  updateHandler?: (items: FormikValues) => void
  removeHandler?: () => void
}

const CrudForm: FC<TCrudForm> = (
  {
    schema,
    initialValues,
    createHandler,
    updateHandler,
    removeHandler
  }) => {
  const nodes = Object.keys(initialValues)

  const typeForInput = (field: string): string => {
    switch (field) {
      case 'email':
        return 'email'
      case 'password':
        return 'password'
      case 'phone':
        return 'tel'
      case 'tel':
        return 'tel'
      default:
        return 'text'
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={((values) => {
        createHandler && createHandler(values)
        updateHandler && updateHandler(values)
      })}
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
          {nodes.map((item: string, i: number) => {
              if (!item.toLowerCase().includes('id')) {
                return (
                  <Form.Group key={i} className="mb-3" controlId={item}>
                    <Form.Label className="text-capitalize">{item}</Form.Label>
                    <Form.Control
                      name={item}
                      aria-autocomplete="none"
                      value={values[item]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched[item] && !errors[item]}
                      isInvalid={touched[item] && !!errors[item]}
                      required
                      type={typeForInput(item)}
                      placeholder={`Input ${item}`}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item]}</Form.Control.Feedback>
                  </Form.Group>
                )
              } else {
                return (
                  <Form.Group key={i}>
                    <Form.Label className="text-capitalize">{item}</Form.Label>
                    <TagTypeSelect
                      handleChange={handleChange}
                      id={String(values[item])}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item]}</Form.Control.Feedback>
                  </Form.Group>
                )
              }
            }
          )}
          <Row className="mt-4">
            <Col className="d-flex justify-content-end">
              <Button variant="success" type="submit" disabled={!isValid}>Save</Button>
              {removeHandler &&
              <Button variant="danger" className="ms-4" onClick={() => removeHandler()}>REMOVE</Button>}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CrudForm;
