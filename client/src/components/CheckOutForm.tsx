import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const CheckOutForm = () => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  return (
    <Form validated={!name || !surname || !phone || !address}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          required type="text" placeholder="Your firstname" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="secondName">
        <Form.Label>Second Name</Form.Label>
        <Form.Control
          onChange={(e) => setSurname(e.target.value)}
          required type="text" placeholder="Your second name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          onChange={(e) => setPhone(e.target.value)}
          required type="tel" placeholder="0971234567" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="delivery">
        <Form.Label>Delivery address</Form.Label>
        <Form.Control
          onChange={(e) => setAddress(e.target.value)}
          required type="text" placeholder="Zaporozhie city, Sonorniy avenue 100" />
      </Form.Group>
    </Form>
  );
};

export default CheckOutForm;