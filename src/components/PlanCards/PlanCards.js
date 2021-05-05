import "./PlanCards.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PlanCards({ jsonPlans }) {
  function createPlanCard({ filename, img, title, link }) {
    const imgPath = process.env.PUBLIC_URL.concat("/imgs/plans/");

    return (
      <Col xs={12} md={6} lg={4} key={`plan-${filename}`}>
        <Card>
          <Card.Img variant="top" src={imgPath.concat(img)} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Link to={`portal/${link}`} className="btn btn-outline-primary">
              Start
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return <Row className="c-planCard">{jsonPlans.map((plan) => createPlanCard(plan))}</Row>;
}
