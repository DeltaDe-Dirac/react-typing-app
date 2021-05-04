import React, { useState, useEffect } from "react";
import "./PlanCards.css";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import plans from "../../pages/GamePage/available-plans.json";
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
              createPlanCard(
                res.data.file,
                imgPath.concat(res.data.img),
                res.data.name,
                res.data.link,
                res.data.available_plan
              )
            );
            setCards([...cardsArr]);
          })
          .catch((err) => console.error(err))
      );
    }
  }, [cards]);

  function createPlanCard(key, imgsrc, title, link, linkParam) {
    return (
      <Col xs={12} md={6} lg={4} key={`plan-${key}`}>
        <Card>
          <Card.Img variant="top" src={imgsrc} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Link to={`portal/${link}/${linkParam}`} className="btn btn-outline-primary">
              Start
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return <Row className="c-planCard">{cards}</Row>;
}
