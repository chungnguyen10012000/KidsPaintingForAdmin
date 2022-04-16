import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
import Routers from "./components/Routers/Routers";
import Start from "./components/Start/Start";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";


const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <AccountRoute path="/:id/login"><Login /></AccountRoute>
          <PrivateRoute path="/:id">
            <Routers />
          </PrivateRoute>
          <Route path={`/`}><Start /></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
