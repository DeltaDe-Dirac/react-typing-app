import "./GamePage.css";
import { useParams } from "react-router";
import PlanCards from "../../components/PlanCards/PlanCards";

export default function GamePage() {
  const { num } = useParams();
  console.log(num);

  return (
    <>
      <PlanCards />
    </>
  );
}
