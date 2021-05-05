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

export default function App() {
  const firebase = useContext(FirebaseContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [planName, setPlanName] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [typeMe, setTypeMe] = useState(null);

  useEffect(() => {
    console.log("app auth check");
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("app going to setIsLoggedIn(true)");
        setIsLoggedIn(true);
        setIsSignOut(false);
      }
    });
  }, [firebase]);

  useEffect(() => {
    console.log("app want to sign out");
    if (isSignOut) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setIsLoggedIn(false);
          setIsSignOut(false);
          console.log("signed out");
        })
        .catch((error) => {
          console.error(error.code, "|", error.message);
        });
    }
  }, [firebase, isSignOut]);

  useEffect(() => {
    if (planName) {
      console.log("creating lessons object");
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
          {/* <Route exact path="/portal/games/:num">
            <PortalPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isSignOut={isSignOut}
              setIsSignOut={setIsSignOut}
              jsonPlans={jsonPlans}
            />
          </Route> */}
          <Route exact path="/play">
            <>{typeMe}</>
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
