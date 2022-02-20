import React from 'react';
import {Card, Container} from "react-bootstrap";
import AuthForm from "../components/AuthForm"

const Auth = () => {

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-5 p-5" style={{borderRadius: "1.25rem"}}>
        <h2 className="m-auto mb-3">Authentication</h2>
        <AuthForm/>
      </Card>
    </Container>
  );
};

export default Auth;
