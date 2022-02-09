import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom"
import {ADMIN_DASHBOARD, LOGIN_ROUTE} from "../utils/consts"
import {login} from "../http/loginAPI"

const Auth = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === LOGIN_ROUTE
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const click = async () => {
    if (isLogin) {
      const response = await login(email, password)
      if (response && response.statusText === "OK") {
        localStorage.setItem('token', response['data'].token)
        navigate(ADMIN_DASHBOARD)
      }
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-5 p-5" style={{borderRadius: "1.25rem"}}>
        <h2 className="m-auto mb-3">Authentication</h2>
        <Form className="d-flex flex-column" validated={!email || !password}>
          <Form.Group className="mb-3" controlId="formUserEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Input your email..."
              required
            />
            {!email &&
            <Form.Text className="red">
              We'll never share your email with anyone else.
            </Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUserPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Input your password..."
              required
            />
            {!password &&
            <Form.Text className="text-">
              Input correct password
            </Form.Text>}
          </Form.Group>
        </Form>
        <Button disabled={!email || !password}
                variant="outline-success"
                className="align-self-end"
                onClick={click}
        >Login</Button>
      </Card>
    </Container>
  );
};

export default Auth;
