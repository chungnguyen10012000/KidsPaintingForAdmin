import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import LeftMenuForTeacher from "../LeftMenu/LefMenuForTeacher";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import Teachers from "../Teachers/Teachers";
import Home from "../Home/Home";
import Contest from "../Contest/Contest"
import Notifications from "../../common/components/Notification";
import Courses from "../Courses/Courses";
import MyClass from "../MyClass/MyClass";
import Account from "../Account/account";
import Lesson from "../Lesson/Lesson";
import LessonDetail from "../Lesson/LessonDetail";
import ExerciseGrade from "../Exercises/ExerciseGrade";
import ContestDetail from "../Contest/ContestDetail";
import Exercises from "../Exercises/Exercise";
import Blogs from "../Blogs/Blog";
import Sesson from "../Sesson/Sesson";
import JitsiComponent from "../Lesson/VideoCall";

import { useParams } from "react-router";
import LeftMenuForEmployees from "../LeftMenu/LeftMenuForEmployees";
import Employees from "../Employees/Employees";
import Schedule from "../Schedule/Schedule";
import FeedBackDetail from "../Blogs/FeedBackDetail"

type role = {
  id: string;
};

const Admin: React.FC = () => {
  const { id } = useParams<role>()
  //console.log(id)
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
              <Route path={`/:id/teacher`}><Teachers /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/myclass`}><MyClass /></Route>
              <Route path={`/:id/lesson`}><Lesson /></Route>
              <Route path={`/:id/lesson-detail`}><LessonDetail /></Route>
              <Route path={`/:id/video-call`}><JitsiComponent /></Route>
              <Route path={`/:id/exercise`}><Exercises /></Route>
              <Route path={`/:id/exercise-grade`}><ExerciseGrade /></Route>
              <Route path={`/:id/submit-contest`}><ContestDetail /></Route>
              <Route path={`/:id/contest`}><Contest /></Route>
              <Route path={`/:id/home`}><Home /></Route>
              <Route path={`/:id/account`}><Account /></Route>
              <Route path={`/:id/schedule`}><Schedule /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>   
    )
  }

  else if (id === "admin"){
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
                <Route path={`/:id/blogs`}><Blogs /></Route>
                <Route path={`/:id/teacher`}><Teachers /></Route>
                <Route path={`/:id/employee`}><Employees /></Route>
                <Route path={`/:id/courses`}><Courses /></Route>
                <Route path={`/:id/myclass`}><MyClass /></Route>
                <Route path={`/:id/feedback-detail`}><FeedBackDetail /></Route>
                <Route path={`/:id/sesson`}><Sesson /></Route>
                <Route path={`/:id/contest`}><Contest /></Route>
                <Route path={`/:id/home`}><Home /></Route>
                <Route path={`/:id/account`}><Account /></Route>
              </Switch>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Notifications />
      <LeftMenuForEmployees />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Switch>
              <Route path={`/:id/users`}><Users /></Route>
              <Route path={`/:id/blogs`}><Blogs /></Route>
              <Route path={`/:id/teacher`}><Teachers /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/feedback-detail`}><FeedBackDetail /></Route>
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
