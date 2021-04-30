import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [cursorColor, toggleCursorColor] = useState(true);
  const [headerText, setHeaderText] = useState({ text: "Touch Typing", word: " Practice.", index: 0 });

  useEffect(() => {
    const blinkingCursor = setTimeout(function () {
      toggleCursorColor(!cursorColor);
    }, 500);

    return () => {
      clearTimeout(blinkingCursor);
    };
  }, [cursorColor]);

  useEffect(() => {
    let typeWord = null;

    if (headerText.index < headerText.word.length) {
      typeWord = setTimeout(function () {
        const newHeaderText = {
          text: headerText.text.concat(headerText.word[headerText.index]),
          word: headerText.word,
          index: headerText.index + 1,
        };
        setHeaderText(newHeaderText);
      }, Math.floor(Math.random() * 400) + 100);
    }

    return () => {
      if (typeWord !== null) {
        clearTimeout(typeWord);
      }
    };
  }, [headerText]);

  return (
    <div className="p-landWrap">
      <Container fluid>
        <div className="p-landing">
          <h1>TypeMe</h1>
          <Button variant="outline-success" onClick={() => alert()}>
            Login
          </Button>
        </div>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="p-landGetStarted">
              <h1>
                {headerText.text}
                <span className={cursorColor ? "strong" : "weak"}>|</span>
              </h1>
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
