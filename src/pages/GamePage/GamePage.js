import "./GamePage.css";
import { Redirect, useParams } from "react-router";
import PlanCards from "../../components/PlanCards/PlanCards";
import LessonCards from "../../components/LessonCards/LessonCards";
import jsonPlans from "./available-plans.json";
import { Container } from "react-bootstrap";

export default function GamePage() {
  const { num } = useParams();
  //   console.log(plans);

  if (num !== undefined && (!jsonPlans || jsonPlans.length === 0 || num > jsonPlans.length - 1 || !jsonPlans[num])) {
    return <Redirect to="/notfound" />;
  }

  return (
    <>
      {!num ? (
        <Container>
          <PlanCards jsonPlans={jsonPlans} />
        </Container>
      ) : (
        <Container>
          <LessonCards planName={jsonPlans[num].filename} />
        </Container>
      )}
    </>
  );
}
