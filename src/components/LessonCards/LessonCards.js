import { useState } from "react";
import "./LessonCards.css";

import { Card, Col, Row } from "react-bootstrap";
import { Redirect, useRouteMatch } from "react-router-dom";

export default function LessonCards({ planName, lessons }) {
  const { url } = useRouteMatch();
  const [link, setLink] = useState("");

  function createLessonCard({ id, name }) {
    return (
      <Col id={id} xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key={`${planName}-les-${id}`}>
        <Card
          className="text-center c-lessonCard"
          onClick={(e) => {
            setLink(getIdRec(e.target.parentNode));
          }}
        >
          <Card.Header>{id + 1}</Card.Header>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
          <Card.Footer className="text-muted">footer text</Card.Footer>
        </Card>
      </Col>
    );
  }

  function getIdRec(node) {
    if (node && node.id) {
      return node.id;
    }

    return getIdRec(node.parentNode);
  }

  if (link) {
    return <Redirect push to={`${url}/${link}`} />;
  }

  return <Row className="c-lessonCardRow">{lessons.map((lesson) => createLessonCard(lesson))}</Row>;
}
