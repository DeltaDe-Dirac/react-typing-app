import React from "react";
import "./LandingPage.css";
import { Container, Button, Row, Col } from "react-bootstrap";

export default function LandingPage() {
  return (
    <div className="p-landWrap">
      <Container fluid>
        <div className="p-landing">
          <h1 className="fs-1">TypeMe</h1>
          <Button variant="outline-success">Login</Button>
        </div>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="p-landGetStarted">
              <h1 className="fs-1">Touch Typing Practice</h1>
              <Button variant="outline-success">Get Started</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
