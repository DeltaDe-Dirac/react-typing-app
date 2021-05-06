import { useState } from "react";
import "./AuthModal.css";
import { Button, Modal } from "react-bootstrap";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";

export default function AuthModal({ show, setHide, isLoggedIn, setIsLoggedIn }) {
  const [isLoginOrSignup, toggleLoginOrSignup] = useState(true);

  function setIsLoginOrSignup(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleLoginOrSignup(!isLoginOrSignup);
  }

  return (
    <>
      <Modal show={show} onHide={setHide} backdrop="static" keyboard={false} className="c-authModal">
        <Modal.Header closeButton>
          <Modal.Title>
            {isLoginOrSignup ? "Log In or " : "Sign Up or "}
            <Link to="#" onClick={(e) => setIsLoginOrSignup(e)}>
              {isLoginOrSignup ? "Sign Up" : "Log In"}
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm
            isLoginOrSignup={isLoginOrSignup}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setHide={setHide}
          />
        </Modal.Body>
        <Modal.Footer>
          <Link to="#" onClick={() => alert("Feature under construction")}>
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
