import React, { useState } from "react";
import "./AuthModal.css";
import { Button, Modal } from "react-bootstrap";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";

export default function AuthModal({ show, setHide }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Modal show={show} onHide={setHide} backdrop="static" keyboard={false} className="c-authModal">
        <Modal.Header closeButton>
          <Modal.Title>
            {isLogin ? "Log In or " : "Sign Up or "}
            <Link to="#" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm isLogin={isLogin} />
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
