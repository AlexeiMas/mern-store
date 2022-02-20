import React, {useState} from 'react';
import * as yup from 'yup'
import {Formik} from 'formik'
import {Button, Form, Spinner} from "react-bootstrap"
import {login} from "../http/loginAPI"
import {ADMIN_DASHBOARD, LOGIN_ROUTE} from "../utils/consts"
import {useLocation, useNavigate} from "react-router-dom"

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(3)
})

const AuthForm = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const isLoginRoute = pathname === LOGIN_ROUTE
  const [isRequest, setIsRequest] = useState<boolean>(false)

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>, email: string, password: string) => {
    e.preventDefault()
    setIsRequest(true)
    if (isLoginRoute) {
      const response = await login(email, password)
      if (response && response.statusText === "OK") {
        localStorage.setItem('token', 'Bearer ' + response['data'].token)
        navigate(ADMIN_DASHBOARD)
      }
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: '',
        password: ''
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
          errors
        }) => (
        <Form>
          <Form.Group className="mb-3" controlId="AuthEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name={"email"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
              required type="email" placeholder="Input your email, ex. user@example.com"/>
            <Form.Control.Feedback type={"invalid"}>{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="AuthPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name={"password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
              required type="password" placeholder="Input your password..."/>
            <Form.Control.Feedback type={"invalid"}>{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="outline-success"
            className="align-self-end"
            disabled={!touched.email || !isValid}
            onClick={(e) => loginHandler(e, values.email, values.password)}
          >
            {
              isRequest &&
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            }
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
