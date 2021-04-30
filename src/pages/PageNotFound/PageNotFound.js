import React, { useState } from "react";
import { Redirect } from "react-router";
import { Nav } from "react-bootstrap/";

import "./PageNotFound.css";
import { Container } from "react-bootstrap";

export default function PageNotFound() {
  const [redirectTo, setRedirectTo] = useState(null);

  if (redirectTo !== null) {
    return <Redirect to={redirectTo}></Redirect>;
  }

  return (
    <div className="pagenotfound-img">
      <Container>
        <h1>404</h1>
        <div className="notfound">
          <p className="text-uppercase">page not found</p>
          <Nav.Link eventKey="/" onSelect={(selectedKey) => setRedirectTo(selectedKey)}>
            Home
          </Nav.Link>
        </div>
      </Container>
    </div>
  );
}
