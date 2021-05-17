import { useEffect, useState, useCallback } from "react";
import "./PortalPage.css";

import { Redirect, useParams, Switch, Route, useRouteMatch, HashRouter } from "react-router-dom";

import PortalNavBar from "../../components/PortalNavBar/PortalNavBar";
import AuthModal from "../../components/AuthModal/AuthModal";
import { Container } from "react-bootstrap";
import PlanCards from "../../components/PlanCards/PlanCards";
import LessonCards from "../../components/LessonCards/LessonCards";
import jsonPlans from "./available-plans.json";
import axios from "axios";
import TypingPage from "../TypingPage/TypingPage";

export default function PortalPage({ isLoggedIn, setIsLoggedIn, isSignOut, setIsSignOut }) {
  const { url, path } = useRouteMatch();
  const { planArg, playArg } = useParams();
  // console.log(useRouteMatch(), "planArg:", planArg, "playArg:", playArg);

  const [showAuth, setShowAuth] = useState(false);
  const [lessons, setLessons] = useState(null);
  const [planArgChaned, setPlanArgChanged] = useState(planArg);

  const isValidPlanArgument = useCallback(() => {
    return planArg && jsonPlans && jsonPlans.length > 0 && Number(planArg) < jsonPlans.length && jsonPlans[planArg];
  }, [planArg]);

  function isValidLessonArgument() {
    return playArg && lessons && lessons.length > 0 && Number(playArg) < lessons.length && lessons[playArg];
  }

  useEffect(() => {
    if (isValidPlanArgument()) {
      const dataPath = process.env.PUBLIC_URL.concat("/data/");
      setPlanArgChanged(planArg);

      axios
        .get(dataPath.concat(jsonPlans[planArg].filename))
        .then((res) => setLessons(res.data.lessons))
        .catch((err) => console.error(err));
    }

    if (planArg !== planArgChaned) {
      setLessons(null);
    }
  }, [planArg, isValidPlanArgument]);

  if (isSignOut) {
    return <Redirect push to="/" />;
  }

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path={`${path}/:planArg/:playArg`}>
            <TypingPage
              typeMe={
                isValidLessonArgument()
                  ? {
                      text: lessons[playArg].text,
                      header: { title: lessons[playArg].name, num: lessons[playArg].id + 1 },
                    }
                  : null
              }
            />
          </Route>
          <Route exact path={`${path}/:planArg`}>
            <PortalNavBar isLoggedIn={isLoggedIn} setIsSignOut={setIsSignOut} setShowAuth={setShowAuth} />
            <div className="lessonsWrapper">
              <Container className="p-portalPage">
                <h1>{isLoggedIn ? "Hello logged in user" : "Hello anonymous user"}</h1>
                <LessonCards
                  planName={isValidPlanArgument() ? jsonPlans[planArg].filename : ""}
                  lessons={lessons && lessons.length > 0 ? lessons : null}
                />
              </Container>
            </div>
          </Route>
          <Route exact path={`${url}`}>
            <PortalNavBar isLoggedIn={isLoggedIn} setIsSignOut={setIsSignOut} setShowAuth={setShowAuth} />
            <div className="lessonsWrapper">
              <Container className="p-portalPage">
                <h1>{isLoggedIn ? "Hello logged in user" : "Hello anonymous user"}</h1>
                <PlanCards jsonPlans={jsonPlans} />
              </Container>
            </div>
          </Route>
        </Switch>
      </HashRouter>
      <AuthModal
        show={showAuth}
        setHide={() => setShowAuth(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
