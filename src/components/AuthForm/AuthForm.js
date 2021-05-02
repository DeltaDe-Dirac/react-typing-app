import { useContext, createRef, useEffect, useState } from "react";
import "./AuthForm.css";

import { Form, Col, Button, Alert } from "react-bootstrap";
import { FirebaseContext } from "../../utils/firebase";
import "firebase/analytics";
import "firebase/auth";

export default function LoginForm({ isLoginOrSignup, isLoggedIn, setIsLoggedIn, setHide }) {
  const [validated, setValidated] = useState(false);
  const [authError, setAuthError] = useState(null);

  const firebase = useContext(FirebaseContext);
  const emailRef = createRef();
  const passRef = createRef();

  useEffect(() => {
    return () => {
      if (!isLoggedIn) {
        setValidated(false);
        setAuthError(null);
      }
    };
  }, [isLoginOrSignup, isLoggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setAuthError(null);

    if (e.currentTarget.checkValidity()) {
      authenticate();
    }

    setValidated(true);
  }

  function authenticate() {
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (isLoginOrSignup) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          // console.log(userCredential.user);
          setIsLoggedIn(true);
          setHide();
        })
        .catch((error) => {
          console.error(error.code, "|", error.message);
          setAuthError(error.message);
        });
    }
    // sign up
    else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          // console.log(userCredential.user);
          setIsLoggedIn(true);
          setHide();
        })
        .catch((error) => {
          console.error(error.code, "|", error.message);
          setAuthError(error.message);
        });
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} className="c-loginForm">
      {authError ? (
        <Alert variant="danger">
          <p className="mb-0">{authError}</p>
        </Alert>
      ) : null}
      {!isLoginOrSignup ? (
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
          <Form.Control
            required
            type="email"
            placeholder="Email"
            maxLength={25}
            ref={emailRef}
            autoComplete="username"
          />
          <Form.Control.Feedback type="invalid">Invalid email format</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className="submitForm">
        <Form.Group as={Col} md="8" controlId="validationCustom04">
          <Form.Control required type="password" placeholder="Password" ref={passRef} autoComplete="current-password" />
          <Form.Control.Feedback type="invalid">Required Field</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-success">
          {isLoginOrSignup ? "Sign In" : "Sing Up"}
        </Button>
      </Form.Row>
    </Form>
  );
}
