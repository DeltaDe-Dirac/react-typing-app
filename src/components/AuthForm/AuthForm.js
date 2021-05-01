import React, { useEffect, useState } from "react";
import "./AuthForm.css";
import { Form, Col, Button } from "react-bootstrap";

export default function LoginForm({ isLogin }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    return () => {
      setValidated(false);
    };
  }, [isLogin]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="c-loginForm">
      {!isLogin ? (
        <>
          <Form.Row>
            <Form.Group as={Col} md="8" controlId="validationCustom01">
              <Form.Control required type="text" placeholder="First Name" maxLength={25} />
              <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="8" controlId="validationCustom02">
              <Form.Control required type="text" placeholder="Last Name" maxLength={25} />
              <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </>
      ) : null}
      <Form.Row>
        <Form.Group as={Col} md="8" controlId="validationCustom03">
          <Form.Control required type="text" placeholder="Username or Email" maxLength={25} />
          <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className="submitForm">
        <Form.Group as={Col} md="8" controlId="validationCustom04">
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-success">
          {isLogin ? "Sign In" : "Sing Up"}
        </Button>
      </Form.Row>
    </Form>
  );
}
