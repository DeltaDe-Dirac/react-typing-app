import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PortalPage from "./pages/PortalPage/PortalPage";

import { FirebaseContext } from "./utils/firebase";
import "firebase/analytics";
import "firebase/auth";

import jsonPlans from "./available-plans.json";
import TypingPage from "./pages/TypingPage/TypingPage";

export default function App() {
  const firebase = useContext(FirebaseContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [planName, setPlanName] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [typeMe, setTypeMe] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        setIsSignOut(false);
      }
    });
  }, [firebase]);

  useEffect(() => {
    if (isSignOut) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setIsLoggedIn(false);
          setIsSignOut(false);
        })
        .catch((error) => {
          console.error(error.code, "|", error.message);
        });
    }
  }, [firebase, isSignOut]);

  useEffect(() => {
    if (planName) {
      const dataPath = process.env.PUBLIC_URL.concat("/data/");

      axios
        .get(dataPath.concat(planName))
        .then((res) => setLessons(res.data.lessons))
        .catch((err) => console.error(err));
    } else {
      setLessons(null);
      setTypeMe(null);
    }
  }, [planName]);

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/portal/:planArg?">
            <PortalPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isSignOut={isSignOut}
              setIsSignOut={setIsSignOut}
              jsonPlans={jsonPlans}
              planName={planName}
              setPlanName={setPlanName}
              lessons={lessons}
              typeMe={typeMe}
              setTypeMe={setTypeMe}
            />
          </Route>
          <Route exact path="/play">
            <>
              <TypingPage typeMe={typeMe} />
            </>
          </Route>
          <Route path="/construction">
            <PageNotFound
              imgPath="/imgs/background/pexels-sebastiaan-stam-construction.jpg"
              errCode="404"
              errText="under construction"
            />
          </Route>
          <Route path="/">
            <PageNotFound imgPath="/imgs/background/pexels-toni-cuenca.jpg" errCode="404" errText="page not found" />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}
