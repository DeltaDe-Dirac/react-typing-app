import React, { useState } from "react";
import "./AuthForm.css";
import { Form, Col, Button } from "react-bootstrap";

export default function LoginForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="c-loginForm">
      <Form.Row>
        <Form.Group as={Col} md="8" controlId="validationCustom01">
          <Form.Control required type="text" placeholder="Username or Email" maxLength={25} />
          <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className="submitForm">
        <Form.Group as={Col} md="8" controlId="validationCustom02">
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-success">
          Sign In
        </Button>
      </Form.Row>
    </Form>
  );
}
