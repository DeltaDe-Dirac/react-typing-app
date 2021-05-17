import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { HashRouter, Switch, Route } from "react-router-dom";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import LandingPage from "./pages/LandingPage/LandingPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PortalPage from "./pages/PortalPage/PortalPage";

import { FirebaseContext } from "./utils/firebase";
import "firebase/analytics";
import "firebase/auth";

library.add(fas, far);
export default function App() {
  const firebase = useContext(FirebaseContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);

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

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/portal/plans/:planArg?/:playArg?">
            <PortalPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isSignOut={isSignOut}
              setIsSignOut={setIsSignOut}
              // typeMe={typeMe}
              // setTypeMe={setTypeMe}
            />
          </Route>
          {/* <Route exact path="/portal/:planArg/play">
            <>
              <TypingPage typeMe={typeMe} />
            </>
          </Route> */}
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
