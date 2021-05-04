import { useEffect, useState } from "react";
import "./LessonCards.css";

import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import plans from "../../pages/GamePage/available-plans.json";

export default function LessonCards({ planIndex }) {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if (cards === null) {
      console.log("lessonCard adding cards");
      const dataPath = process.env.PUBLIC_URL.concat("/data/");
      const cardsArr = [];

      axios
        .get(dataPath.concat(plans[planIndex]))
        .then((res) =>
          res.data.lessons.forEach((lesson) => {
            cardsArr.push(createLessonCard(lesson.id, lesson.id + 1, lesson.name));
            setCards([...cardsArr]);
          })
        )
        .catch((err) => console.error(err));
    }
  }, [cards, planIndex]);

  function createLessonCard(key, num, title) {
    return (
      <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key={`pl-${planIndex}-les-${key}`}>
        <Card className="text-center c-lessonCard">
          <Card.Header>{num}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer className="text-muted">footer text</Card.Footer>
        </Card>
      </Col>
    );
  }

  return <Row className="c-lessonCardRow">{cards}</Row>;
}
