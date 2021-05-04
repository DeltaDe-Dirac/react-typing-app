import { useState } from "react";
import "./PortalPage.css";

import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PortalNavBar from "../../components/PortalNavBar/PortalNavBar";
import AuthModal from "../../components/AuthModal/AuthModal";
import GamePage from "../GamePage/GamePage";

export default function PortalPage({ isLoggedIn, setIsLoggedIn, isSignOut, setIsSignOut }) {
  const [showAuth, setShowAuth] = useState(false);

  if (isSignOut) {
    console.log("back to home");
    return <Redirect push to="/" />;
  }

  return (
    <>
      <PortalNavBar isLoggedIn={isLoggedIn} setIsSignOut={setIsSignOut} setShowAuth={setShowAuth} />
      <Container fluid="lg" className="p-portalPage">
        <h1>{isLoggedIn ? "Hello logged in user" : "Hello anonymous user"}</h1>
        <GamePage />
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
