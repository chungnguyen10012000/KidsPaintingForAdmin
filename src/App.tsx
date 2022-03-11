import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
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
            <Admin />
          </PrivateRoute>
          <Route path={`/`}><Start /></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
