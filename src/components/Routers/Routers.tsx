import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import LeftMenuForTeacher from "../LeftMenu/LefMenuForTeacher";
import TopMenu from "../TopMenu/TopMenu";
import { Switch, Route } from "react-router";
import Users from "../Users/Users";
import AddUser from "../AddUser/AddUser";
import Home from "../Home/Home";
import Contest from "../Contest/Contest"
import Courses from "../Courses/Courses";
import Account from "../Account/account";
import Lesson from "../Lesson/Lesson";
import LessonDetail from "../Lesson/LessonDetail";
import ExerciseGrade from "../Exercises/ExerciseGrade";
import ContestDetail from "../Contest/ContestDetail";
import Exercises from "../Exercises/Exercise";
import FeedBack from "../FeedBack/FeedBack";
import Sesson from "../Sesson/Sesson";
import JitsiComponent from "../Lesson/VideoCall";
import Blogs from "../Blogs/Blog";
import BlogDetail from "../Blogs/BlogDetail";
import SigupOfCourse from "../SigupOfTeacher/SigupOfTeacher";
import RequestForTeacher from "../Request/Request";
import OnLeave from "../OnLeave/OnLeave";

import { useParams } from "react-router";
import LeftMenuForEmployees from "../LeftMenu/LeftMenuForEmployees";
import Schedule from "../Schedule/Schedule";
import FeedBackDetail from "../FeedBack/FeedBackDetail"
import ContestView from "../Contest/ContestView"
import TeacherOfCourse from "../Request/TeacherOfCourse"
import Student from "../Student/Student"
import ContestGrade from "../Contest/ContestGrade"
import SigupLevelTeacher from "../SigupLevelTeacher/SigupLevelTeacher"
import StarRatingForAdmin from "../StarRating/StarRatingForAdmin";
import LeftMenuForSuperAdmin from "../LeftMenu/LeftMenuForSuperAdmin";
import Art from "../Art/Art";
import EditInfo from "../Account/EditInfo";
import ChangePassword from "../Account/ChangePassword";
import Notification from "../Notification/Notification"
import Notifications from "../../common/components/Notification"
import LessonTime from "../Lesson_Time/LessonTime"
import ArrangeClass from "../Arrange_Class/Arrange_Class";
import Calendar from "../Calendar/Calendar";
import Semester from "../Semester/Semester";
import MyClass from "../MyClass/MyClass"
import NotificationDetail from "../Notification/NotificationDetail";
import ContestForm from "../Contest/ContestForm";
import CoursesForm from "../Courses/CoursesForm";
import CourseDetail from "../Courses/CourseDetail";
import BlogForm from "../Blogs/BlogForm";

type role = {
  id: string;
};

const Routers: React.FC = () => {
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
              <Route path={`/:id/myclass`}><MyClass /></Route>
              <Route path={`/:id/edit-info`}><EditInfo /></Route>
              <Route path={`/:id/change-password`}><ChangePassword /></Route>
              <Route path={`/:id/add-user`}><AddUser /></Route>
              <Route path={`/:id/notification-detail`}><NotificationDetail /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/onleave`}><OnLeave /></Route>
              <Route path={`/:id/notification`}><Notification /></Route>
              <Route path={`/:id/lesson`}><Lesson /></Route>
              <Route path={`/:id/sigup-class`}><SigupOfCourse /></Route>
              <Route path={`/:id/sigup-course`}><SigupLevelTeacher /></Route>
              <Route path={`/:id/lesson-detail`}><LessonDetail /></Route>
              <Route path={`/:id/video-call`}><JitsiComponent /></Route>
              <Route path={`/:id/exercise`}><Exercises /></Route>
              <Route path={`/:id/exercise-grade`}><ExerciseGrade /></Route>
              <Route path={`/:id/contest-grade`}><ContestGrade /></Route>
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
                <Route path={`/:id/edit-info`}><EditInfo /></Route>
                <Route path={`/:id/change-password`}><ChangePassword /></Route>
                <Route path={`/:id/notification`}><Notification /></Route>
                <Route path={`/:id/notification-detail`}><NotificationDetail /></Route>
                <Route path={`/:id/feedbacks`}><FeedBack /></Route>
                <Route path={`/:id/course-detail`}><CourseDetail /></Route>
                <Route path={`/:id/add-user`}><AddUser /></Route>
                <Route path={`/:id/edit-contest`}><ContestForm /></Route>
                <Route path={`/:id/edit-course`}><CoursesForm /></Route>
                <Route path={`/:id/calendar`}><Calendar /></Route>
                <Route path={`/:id/arrange-class`}><ArrangeClass /></Route>
                <Route path={`/:id/teacher-rating`}><StarRatingForAdmin /></Route>
                <Route path={`/:id/request`}><RequestForTeacher /></Route>
                <Route path={`/:id/teacherofcourse`}><TeacherOfCourse /></Route>
                <Route path={`/:id/student-request`}><Student /></Route>
                <Route path={`/:id/courses`}><Courses /></Route>
                <Route path={`/:id/blog`}><Blogs /></Route>
                <Route path={`/:id/contest-detail`}><ContestView /></Route>
                <Route path={`/:id/blog-detail`}><BlogDetail /></Route>
                <Route path={`/:id/edit-blog`}><BlogForm /></Route>
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

  else if (id === "super-admin"){
    return (
      <Fragment>
        <Notifications />
        <LeftMenuForSuperAdmin />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopMenu />
            <div className="container-fluid">
              <Switch>
                <Route path={`/:id/users`}><Users /></Route>
                <Route path={`/:id/edit-info`}><EditInfo /></Route>
                <Route path={`/:id/change-password`}><ChangePassword /></Route>
                <Route path={`/:id/semester`}><Semester /></Route>
                <Route path={`/:id/notification`}><Notification /></Route>
                <Route path={`/:id/edit-contest`}><ContestForm /></Route>
                <Route path={`/:id/edit-course`}><CoursesForm /></Route>
                <Route path={`/:id/feedbacks`}><FeedBack /></Route>
                <Route path={`/:id/edit-blog`}><BlogForm /></Route>
                <Route path={`/:id/notification-detail`}><NotificationDetail /></Route>
                <Route path={`/:id/calendar`}><Calendar /></Route>
                <Route path={`/:id/course-detail`}><CourseDetail /></Route>
                <Route path={`/:id/arrange-class`}><ArrangeClass /></Route>
                <Route path={`/:id/lesson-time`}><LessonTime /></Route>
                <Route path={`/:id/add-user`}><AddUser /></Route>
                <Route path={`/:id/teacher-rating`}><StarRatingForAdmin /></Route>
                <Route path={`/:id/request`}><RequestForTeacher /></Route>
                <Route path={`/:id/teacherofcourse`}><TeacherOfCourse /></Route>
                <Route path={`/:id/student-request`}><Student /></Route>
                <Route path={`/:id/art`}><Art /></Route>
                <Route path={`/:id/courses`}><Courses /></Route>
                <Route path={`/:id/blog`}><Blogs /></Route>
                <Route path={`/:id/contest-detail`}><ContestView /></Route>
                <Route path={`/:id/blog-detail`}><BlogDetail /></Route>
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
              <Route path={`/:id/edit-info`}><EditInfo /></Route>
              <Route path={`/:id/change-password`}><ChangePassword /></Route>
              <Route path={`/:id/notification`}><Notification /></Route>
              <Route path={`/:id/course-detail`}><CourseDetail /></Route>
              <Route path={`/:id/calendar`}><Calendar /></Route>
              <Route path={`/:id/edit-blog`}><BlogForm /></Route>
              <Route path={`/:id/feedbacks`}><FeedBack /></Route>
              <Route path={`/:id/add-user`}><AddUser /></Route>
              <Route path={`/:id/request`}><RequestForTeacher /></Route>
              <Route path={`/:id/student-request`}><Student /></Route>
              <Route path={`/:id/courses`}><Courses /></Route>
              <Route path={`/:id/edit-contest`}><ContestForm /></Route>
              <Route path={`/:id/edit-course`}><CoursesForm /></Route>
              <Route path={`/:id/notification-detail`}><NotificationDetail /></Route>
              <Route path={`/:id/blog`}><Blogs /></Route>
              <Route path={`/:id/teacher-rating`}><StarRatingForAdmin /></Route>
              <Route path={`/:id/teacherofcourse`}><TeacherOfCourse /></Route>
              <Route path={`/:id/contest-detail`}><ContestView /></Route>
              <Route path={`/:id/blog-detail`}><BlogDetail /></Route>
              <Route path={`/:id/feedback-detail`}><FeedBackDetail /></Route>
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

export default Routers;
