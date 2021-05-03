import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PortalPage from "./pages/PortalPage/PortalPage";

import { FirebaseContext } from "./utils/firebase";
import "firebase/analytics";
import "firebase/auth";

export default function App() {
  const firebase = useContext(FirebaseContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);

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

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/portal">
            <PortalPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isSignOut={isSignOut}
              setIsSignOut={setIsSignOut}
            />
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
