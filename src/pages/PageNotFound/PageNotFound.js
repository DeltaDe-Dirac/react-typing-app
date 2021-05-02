import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

import { Nav } from "react-bootstrap/";

import "./PageNotFound.css";
import { Container } from "react-bootstrap";

export default function PageNotFound({ imgPath, errCode, errText }) {
  let history = useHistory();
  const [redirectTo, setRedirectTo] = useState(null);

  if (redirectTo === "home") {
    return <Redirect to="/"></Redirect>;
  } else if (redirectTo === "back") {
    return <Redirect to={history.goBack()}></Redirect>;
  }

  const img = process.env.PUBLIC_URL.concat(imgPath);

  return (
    <div className="pagenotfound-img" style={{ backgroundImage: `url(${img})` }}>
      <Container>
        <h1>{errCode}</h1>
        <div className="notfound">
          <p className="text-uppercase">{errText}</p>
          <Nav.Link eventKey="home" onSelect={(selectedKey) => setRedirectTo(selectedKey)}>
            Home
          </Nav.Link>
          <Nav.Link eventKey="back" onSelect={(selectedKey) => setRedirectTo(selectedKey)}>
            Back
          </Nav.Link>
        </div>
      </Container>
    </div>
  );
}
