import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CoursesList from "./CoursesList";
import CoursesForm from "./CoursesForm";
import TypeForm from "./TypeForm";
import LevelForm from "./LevelForm";
import TopCard from "../../common/components/TopCard";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TypeList from "./TypeList";
import LevelList from "./LevelList";
import CoursesSemesterList from "./CourseSemesterList";
import CourseSemesterForm from "./CourseSemesterForm";


import { ICourseState, ICourseSemesterState, IStateType, IRootPageStateType, IMytypeState, ILevelState } from "../../store/models/root.interface";

import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";
import { MytypeModificationStatus, IMytype } from "../../store/models/mytypes.interface";
import { LevelModificationStatus, ILevel } from "../../store/models/levels.interface";

import { removeMytype, clearSelectedMytype, changeSelectedMytype, setModificationStateMytype } from "../../store/actions/mytypes.actions";
import { removeCourse, clearSelectedCourse, setModificationState, changeSelectedCourse } from "../../store/actions/courses.actions";
import { removeLevel, clearSelectedLevel, changeSelectedLevel, setModificationStateLevel } from "../../store/actions/levels.actions";

import { CourseSemesterModificationStatus, ICourseSemester } from "../../store/models/course_for_semester.interface";
import { removeCourseSemester, clearSelectedCourseSemester, setModificationStateSemester, changeSelectedCourseSemester } from "../../store/actions/course_for_semester.actions";


type role = {
  id: string;
};

const Courses: React.FC = () => {


  const [popup, setPopup] = useState(false);
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);

  let [isCheck, setIsCheck] = useState('')

  const dispatch: Dispatch<any> = useDispatch();

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const courseSemesters: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);

  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = courses.courses.length;

  useEffect(() => {
    dispatch(clearSelectedCourse());
    dispatch(clearSelectedLevel());
    dispatch(clearSelectedMytype());
    dispatch(clearSelectedCourseSemester());
    dispatch(updateCurrentPath("Khóa học", "Danh sách"));
  }, [path.area, dispatch]);

  function onCourseSelect(course: ICourse): void {
    dispatch(changeSelectedCourse(course));
    dispatch(setModificationState(CourseModificationStatus.None));
  }

  function onCourseSemesterSelect(courseSemester: ICourseSemester): void {
    dispatch(changeSelectedCourseSemester(courseSemester));
    dispatch(setModificationStateSemester(CourseSemesterModificationStatus.None));
  }


  function onMytypeSelect(mytype: IMytype): void {
    dispatch(changeSelectedMytype(mytype));
    dispatch(setModificationStateMytype(MytypeModificationStatus.None));
  }

  function onLevelSelect(level: ILevel): void {
    dispatch(changeSelectedLevel(level));
    dispatch(setModificationStateLevel(LevelModificationStatus.None));
  }

  function onCourseRemove() {
    if (courses.selectedCourse) {
      setPopup(true);
    }
  }

  function onCourseSemesterRemove() {
    if (courseSemesters.selectedCourseSemester) {
      setPopup3(true);
    }
  }

  function onMytypeRemove() {
    if (mytypes.selectedMytype) {
      setPopup1(true);
    }
  }

  function onLevelRemove() {
    if (levels.selectedLevel) {
      setPopup2(true);
    }
  }
  

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Khóa học</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ KHÓA HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" id="0" onClick={() =>{
                  setIsCheck('1')
                  dispatch(setModificationState(CourseModificationStatus.Create))}}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(CourseModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onCourseRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <CoursesList
                onSelect={onCourseSelect}
              />
            </div>
          </div>
        </div>
        {((courses.modificationState === CourseModificationStatus.Create && isCheck === '1')
          || (courses.modificationState === CourseModificationStatus.Edit && courses.selectedCourse)) ?
          <CoursesForm /> : null}
      </div>


      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học theo học kỳ</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" id="0" onClick={() =>{
                  setIsCheck('100')
                  dispatch(setModificationStateSemester(CourseSemesterModificationStatus.Create))}}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationStateSemester(CourseSemesterModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onCourseSemesterRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <CoursesSemesterList
                onSelect={onCourseSemesterSelect}
              />
            </div>
          </div>
        </div>
        {((courseSemesters.modificationState === CourseSemesterModificationStatus.Create && isCheck === '100')
          || (courseSemesters.modificationState === CourseSemesterModificationStatus.Edit && courseSemesters.selectedCourseSemester)) ?
          <CourseSemesterForm /> : null}
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách loại hình </h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green btn-createType" id="1" onClick={() =>{
                  setIsCheck('2')
                  dispatch(setModificationStateMytype(MytypeModificationStatus.Create))}}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue btn-editType" onClick={() =>
                  dispatch(setModificationStateMytype(MytypeModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red btn-removeType" onClick={() => onMytypeRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <TypeList
                onSelect={onMytypeSelect}
              />
            </div>
          </div>
        </div>
        {((mytypes.modificationState === MytypeModificationStatus.Create && isCheck === '2')
          || (mytypes.modificationState === MytypeModificationStatus.Edit && mytypes.selectedMytype)) ?
          <TypeForm /> : null}
      </div>


      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách mức độ </h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green btn-createType1" id="1" onClick={() =>{
                  setIsCheck('3')
                  dispatch(setModificationStateLevel(LevelModificationStatus.Create))}}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue btn-editType1" onClick={() =>
                  dispatch(setModificationStateLevel(LevelModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red btn-removeType1" onClick={() => onLevelRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <LevelList
                onSelect={onLevelSelect}
              />
            </div>
          </div>
        </div>
        {((levels.modificationState === LevelModificationStatus.Create && isCheck === '3')
          || (levels.modificationState === LevelModificationStatus.Edit && levels.selectedLevel)) ?
          <LevelForm /> : null}
      </div>

      <Popup
        className="popup-modal"
        open={popup3}
        onClose={() => setPopup3(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!courseSemesters.selectedCourseSemester) {
                  return;
                }
                dispatch(addNotification("Khóa học theo kỳ", `Đã bị xóa khỏi hệ thống`));
                dispatch(removeCourseSemester(courseSemesters.selectedCourseSemester.courseId));
                dispatch(clearSelectedCourseSemester());
                setPopup3(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>

      <Popup
        className="popup-modal"
        open={popup2}
        onClose={() => setPopup2(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!levels.selectedLevel) {
                  return;
                }
                dispatch(addNotification("Mức độ", ` ${levels.selectedLevel.levelName} đã bị xóa khỏi hệ thống`));
                dispatch(removeLevel(levels.selectedLevel.levelId));
                dispatch(clearSelectedLevel());
                setPopup2(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>

      <Popup
        className="popup-modal"
        open={popup1}
        onClose={() => setPopup1(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!mytypes.selectedMytype) {
                  return;
                }
                dispatch(addNotification("Thể loại", ` ${mytypes.selectedMytype.typeName} đã bị xóa khỏi hệ thống`));
                dispatch(removeMytype(mytypes.selectedMytype.typeId));
                dispatch(clearSelectedMytype());
                setPopup1(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!courses.selectedCourse) {
                  return;
                }
                dispatch(addNotification("Khóa học", ` ${courses.selectedCourse.courseName} đã bị xóa khỏi hệ thống`));
                dispatch(removeCourse(courses.selectedCourse.courseId));
                dispatch(clearSelectedCourse());
                setPopup(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Courses;
