import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter, Switch, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PortalPage from "./pages/PortalPage/PortalPage";

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/portal">
            <PortalPage />
          </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
