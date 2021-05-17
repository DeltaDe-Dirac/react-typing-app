import { useState } from "react";
import "./LessonCards.css";

import { Card, Col, Row } from "react-bootstrap";
import { Redirect, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <Card.Title>
              <div className="lessonTitle">{name}</div>
              <FontAwesomeIcon icon={["fas", "keyboard"]} size="4x" />
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            <span>
              <FontAwesomeIcon icon={["fas", "star"]} />
            </span>
            <span>
              <FontAwesomeIcon icon={["fas", "star-half-alt"]} size="2x" />
            </span>
            <span>
              <FontAwesomeIcon icon={["far", "star"]} />
            </span>
          </Card.Footer>
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

  return (
    <Row className="c-lessonCardRow">
      {lessons ? lessons.map((lesson) => createLessonCard(lesson)) : <div className="loader">LOADING...</div>}
    </Row>
  );
}
