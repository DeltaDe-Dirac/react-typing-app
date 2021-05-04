import React, { useState, useEffect } from "react";
import "./PlanCards.css";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import plans from "./available-plans.json";
import { Link } from "react-router-dom";

export default function PlanCards() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if (cards === null) {
      console.log("planCard adding cards");
      const imgPath = process.env.PUBLIC_URL.concat("/imgs/plans/");
      const dataPath = process.env.PUBLIC_URL.concat("/data/");
      const cardsArr = [];

      plans.forEach((fileName) =>
        axios
          .get(dataPath.concat(fileName))
          .then((res) => {
            cardsArr.push(
              <Col xs={12} md={6} lg={4} key={res.data.file}>
                <Card>
                  <Card.Img variant="top" src={imgPath.concat(res.data.img)} />
                  <Card.Body>
                    <Card.Title>{res.data.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>
                    <Link to={`portal/${res.data.link}/${res.data.available_plan}`} className="btn btn-outline-primary">
                      Start
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
            setCards([...cardsArr]);
          })
          .catch((err) => console.error(err))
      );
    }
  }, [cards]);

  return <Row className="c-planCard">{cards}</Row>;
}
