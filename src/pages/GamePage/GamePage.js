import "./GamePage.css";
import { Redirect, useParams } from "react-router";
import PlanCards from "../../components/PlanCards/PlanCards";
import LessonCards from "../../components/LessonCards/LessonCards";
import plans from "./available-plans.json";

export default function GamePage() {
  const { num } = useParams();
  //   console.log(plans);

  if (num !== undefined && (!plans || plans.length === 0 || num > plans.length - 1 || !plans[num])) {
    return <Redirect to="/notfound" />;
  }

  return <>{!num ? <PlanCards /> : <LessonCards planIndex={num} />}</>;
}
