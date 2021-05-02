import "./PortalPage.css";

import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default function PortalPage({ isLoggedIn, isSignOut, setIsSignOut }) {
  if (isSignOut) {
    console.log("back to home");
    return <Redirect push to="/" />;
  }

  return (
    <Container>
      <h1>
        {isLoggedIn === null
          ? "Hello portal page no user"
          : isLoggedIn
          ? "Hello logged in user"
          : "Hello anonymous user"}
      </h1>
      {isLoggedIn ? (
        <Button type="button" variant="outline-success" onClick={() => setIsSignOut(true)}>
          Sign Out
        </Button>
      ) : null}
    </Container>
  );
}
