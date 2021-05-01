import React, { useState } from "react";
import "./AuthModal.css";
import { Button, Modal } from "react-bootstrap";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";

export default function AuthModal({ show, setHide }) {
  return (
    <>
      <Modal show={show} onHide={setHide} backdrop="static" keyboard={false} className="c-authModal">
        <Modal.Header closeButton>
          <Modal.Title>
            Log In or{" "}
            <Link to="#" onClick={() => alert(" Sing Up")}>
              Sing Up
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm />
        </Modal.Body>
        <Modal.Footer>
          <Link to="#" onClick={() => alert("Sign in with Google")}>
            Sign in with Google
          </Link>
          <Button variant="secondary" onClick={setHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
