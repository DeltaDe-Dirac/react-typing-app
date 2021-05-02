import { useState } from "react";
import "./PortalPage.css";

import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PortalNavBar from "../../components/PortalNavBar/PortalNavBar";
import AuthModal from "../../components/AuthModal/AuthModal";

export default function PortalPage({ isLoggedIn, setIsLoggedIn, isSignOut, setIsSignOut }) {
  const [showAuth, setShowAuth] = useState(false);

  if (isSignOut) {
    console.log("back to home");
    return <Redirect push to="/" />;
  }

  return (
    <>
      <PortalNavBar isLoggedIn={isLoggedIn} setIsSignOut={setIsSignOut} setShowAuth={setShowAuth} />
      <Container>
        <h1>
          {isLoggedIn === null
            ? "Hello portal page no user"
            : isLoggedIn
            ? "Hello logged in user"
            : "Hello anonymous user"}
        </h1>
      </Container>
      <AuthModal
        show={showAuth}
        setHide={() => setShowAuth(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
