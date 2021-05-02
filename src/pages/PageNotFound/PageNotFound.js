import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

import { Nav } from "react-bootstrap/";

import "./PageNotFound.css";
import { Container } from "react-bootstrap";

export default function PageNotFound({ imgPath, errCode, errText }) {
  const history = useHistory();
  const [redirectTo, setRedirectTo] = useState(null);

  if (redirectTo !== null) {
    return <Redirect to={redirectTo}></Redirect>;
  }

  const img = process.env.PUBLIC_URL.concat(imgPath);

  return (
    <div className="pagenotfound-img" style={{ backgroundImage: `url(${img})` }}>
      <Container>
        <h1>{errCode}</h1>
        <div className="notfound">
          <p className="text-uppercase">{errText}</p>
          <Nav.Link eventKey="/" onSelect={(selectedKey) => setRedirectTo(selectedKey)}>
            Home
          </Nav.Link>
          <Nav.Link eventKey="back" onSelect={() => history.goBack()}>
            Back
          </Nav.Link>
        </div>
      </Container>
    </div>
  );
}
