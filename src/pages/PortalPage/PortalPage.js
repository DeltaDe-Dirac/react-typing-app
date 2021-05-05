import { useEffect, useState } from "react";
import "./PortalPage.css";

import { Redirect, useParams } from "react-router-dom";
import PortalNavBar from "../../components/PortalNavBar/PortalNavBar";
import AuthModal from "../../components/AuthModal/AuthModal";
import { Container } from "react-bootstrap";
import PlanCards from "../../components/PlanCards/PlanCards";
import LessonCards from "../../components/LessonCards/LessonCards";

export default function PortalPage({
  isLoggedIn,
  setIsLoggedIn,
  isSignOut,
  setIsSignOut,
  jsonPlans,
  planName,
  setPlanName,
  lessons,
  typeMe,
  setTypeMe,
}) {
  const { planArg } = useParams();
  const [showAuth, setShowAuth] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    if (planArg === undefined) {
      setPlanName(null);
    } else if (!jsonPlans || jsonPlans.length === 0 || planArg > jsonPlans.length - 1 || !jsonPlans[planArg]) {
      setPageNotFound(true);
    } else {
      setPlanName(jsonPlans[planArg].filename);
    }
  }, [planArg, jsonPlans, setPlanName]);

  if (isSignOut) {
    return <Redirect push to="/" />;
  } else if (pageNotFound) {
    return <Redirect to="/notfound" />;
  } else if (typeMe) {
    return <Redirect push to="/play" />;
  }

  return (
    <>
      <PortalNavBar
        isLoggedIn={isLoggedIn}
        setIsSignOut={setIsSignOut}
        setShowAuth={setShowAuth}
        setPlanName={setPlanName}
      />
      <Container className="p-portalPage">
        <h1>{isLoggedIn ? "Hello logged in user" : "Hello anonymous user"}</h1>
        {lessons ? (
          <LessonCards planName={planName} lessons={lessons} setTypeMe={setTypeMe} />
        ) : (
          <PlanCards jsonPlans={jsonPlans} />
        )}
      </Container>
      <AuthModal
        show={showAuth}
        setHide={() => setShowAuth(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
