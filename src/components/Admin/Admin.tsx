import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import Products from "../Teachers/Teachers";
import Home from "../Home/Home";
import Login from "../Account/Login";
import Contest from "../Contest/Contest"
import Notifications from "../../common/components/Notification";
import Courses from "../Courses/Courses";
import MyClass from "../MyClass/MyClass";

const Admin: React.FC = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/users`}><Users /></Route>
              <Route path={`/teacher`}><Products /></Route>
              <Route path={`/courses`}><Courses /></Route>
              <Route path={`/myclass`}><MyClass /></Route>
              <Route path={`/contest`}><Contest /></Route>
              <Route path="/"><Home /></Route>
              <Route path="/login"><Login /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
