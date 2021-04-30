import React from "react";
import "./LandingPage.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="p-landWrap">
      <Container fluid>
        <div className="p-landing">
          <h1 className="fs-1">TypeMe</h1>
          <Button variant="outline-success" onClick={() => alert()}>
            Login
          </Button>
        </div>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="p-landGetStarted">
              <h1>Touch Typing Practice</h1>
              <Link to="/portal" className="btn btn-outline-success">
                Get Started
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
