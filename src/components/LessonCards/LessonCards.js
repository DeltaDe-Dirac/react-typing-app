import { useEffect, useState } from "react";
import "./LessonCards.css";

import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";

export default function LessonCards({ planName }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (lessons.length === 0) {
      console.log("creating lessons object");
      const dataPath = process.env.PUBLIC_URL.concat("/data/");

      axios
        .get(dataPath.concat(planName))
        .then((res) => setLessons(res.data.lessons))
        .catch((err) => console.error(err));
    }
  }, [lessons, planName]);

  function createLessonCard({ id, name, text }) {
    return (
      <Col id={id} xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key={`${planName}-les-${id}`}>
        <Card
          className="text-center c-lessonCard"
          onClick={(e) => console.log(lessons[getIdRec(e.target.parentNode)].text)}
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

  return <Row className="c-lessonCardRow">{lessons.map((lesson) => createLessonCard(lesson))}</Row>;
}
