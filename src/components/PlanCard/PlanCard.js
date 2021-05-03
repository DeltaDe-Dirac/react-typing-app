import React, { useState, useEffect } from "react";
import "./PlanCard.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import plans from "./available-plans.json";

export default function PlanCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const imgPath = process.env.PUBLIC_URL.concat("/imgs/plans/");
    const dataPath = process.env.PUBLIC_URL.concat("/data/");

    plans.forEach((fileName) =>
      axios
        .get(dataPath.concat(fileName))
        .then((res) => {
          cards.push(
            <Col xs={12} md={6} lg={4} key={res.data.file}>
              <Card>
                <Card.Img variant="top" src={imgPath.concat(res.data.img)} />
                <Card.Body>
                  <Card.Title>{res.data.name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="outline-primary">Start</Button>
                </Card.Body>
              </Card>
            </Col>
          );
          setCards([...cards]);
        })
        .catch((err) => console.error(err))
    );
  }, []);

  return <Row className="c-planCard">{cards}</Row>;
}
