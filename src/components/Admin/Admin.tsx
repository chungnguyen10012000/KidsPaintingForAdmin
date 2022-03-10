import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import LeftMenuForTeacher from "../LeftMenu/LefMenuForTeacher";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import Products from "../Teachers/Teachers";
import Home from "../Home/Home";
import Contest from "../Contest/Contest"
import Notifications from "../../common/components/Notification";
import Courses from "../Courses/Courses";
import MyClass from "../MyClass/MyClass";
import Account from "../Account/account";

import { useParams } from "react-router";

type role = {
  id: string;
};

const Admin: React.FC = () => {
  const { id } = useParams<role>()
  console.log(id)
  if (id === "teacher"){
    return (
      <Fragment>
      <Notifications />
      <LeftMenuForTeacher />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/:id/users`}><Users /></Route>
              <Route path={`/:id/teacher`}><Products /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/myclass`}><MyClass /></Route>
              <Route path={`/:id/contest`}><Contest /></Route>
              <Route path={`/:id/home`}><Home /></Route>
              <Route path={`/:id/account`}><Account /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>   
    )
  }
  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/:id/users`}><Users /></Route>
              <Route path={`/:id/teacher`}><Products /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/myclass`}><MyClass /></Route>
              <Route path={`/:id/contest`}><Contest /></Route>
              <Route path={`/:id/home`}><Home /></Route>
              <Route path={`/:id/account`}><Account /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
