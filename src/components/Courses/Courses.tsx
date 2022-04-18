import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CoursesList from "./CoursesList";
import CoursesForm from "./CoursesForm";
import TopCard from "../../common/components/TopCard";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import CoursesSemesterList from "./CourseSemesterList";
import CourseSemesterForm from "./CourseSemesterForm";


import { ICourseState, ICourseSemesterState, IStateType, IRootPageStateType, IMytypeState } from "../../store/models/root.interface";

import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";

import { removeMytype, clearSelectedMytype } from "../../store/actions/art_type/mytypes.actions";
import { removeCourse, clearSelectedCourse, setModificationState, changeSelectedCourse } from "../../store/actions/course/courses.actions";
import { clearSelectedLevel } from "../../store/actions/art_level/levels.actions";

import { CourseSemesterModificationStatus, ICourseSemester } from "../../store/models/course_for_semester.interface";
import { removeCourseSemester, clearSelectedCourseSemester, setModificationStateSemester, changeSelectedCourseSemester } from "../../store/actions/course_semester/course_for_semester.actions";
import { useParams } from "react-router-dom";
import { getCourse } from "../../store/actions/course/getCourse";
import { deleteCourse } from "../../store/actions/course/deleteCourse";
import { getArtType } from "../../store/actions/art_type/getArtType";
import { getLevel } from "../../store/actions/art_level/getLevel";
import { getSchedule } from "../../store/actions/schedule/getSchedule";
import { getCourseSemester } from "../../store/actions/course_semester/getCourseSemester";
import { deleteCourseSemester } from "../../store/actions/course_semester/deleteCourseSemester";


type role = {
  id: string;
};

const Courses: React.FC = () => {

  const { id } = useParams<role>()

  const [popup, setPopup] = useState(false);
  const [popup1, setPopup1] = useState(false);
  //const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);

  let [isCheck, setIsCheck] = useState('')

  const dispatch: Dispatch<any> = useDispatch();

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  //const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const courseSemesters: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);

  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = courses.courses.length;

  useEffect(() => {
    dispatch(getCourse())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseSemester())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArtType())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(getLevel())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSchedule())
  }, [dispatch])

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

  if (id === "admin" || id === "super-admin") {
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
                  <button className="btn btn-success btn-green" id="0" onClick={() => {
                    setIsCheck('1')
                    dispatch(setModificationState(CourseModificationStatus.Create))
                  }}>
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
                  <button className="btn btn-success btn-green" id="0" onClick={() => {
                    setIsCheck('100')
                    dispatch(setModificationStateSemester(CourseSemesterModificationStatus.Create))
                  }}>
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
                  dispatch(deleteCourseSemester(courseSemesters.selectedCourseSemester.id));
                  dispatch(clearSelectedCourseSemester());
                  setPopup3(false);
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
                  dispatch(addNotification("Thể loại", ` ${mytypes.selectedMytype.name} đã bị xóa khỏi hệ thống`));
                  dispatch(removeMytype(mytypes.selectedMytype.id));
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
                  dispatch(addNotification("Khóa học", ` ${courses.selectedCourse.name} đã bị xóa khỏi hệ thống`));
                  dispatch(deleteCourse(courses.selectedCourse.id));
                  dispatch(clearSelectedCourse());
                  setPopup(false);
                }}>Xóa
              </button>
            </div>
          </div>
        </Popup>
      </Fragment >
    );
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
                dispatch(removeCourseSemester(courseSemesters.selectedCourseSemester.id));
                dispatch(clearSelectedCourseSemester());
                setPopup3(false);
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
                dispatch(addNotification("Khóa học", ` ${courses.selectedCourse.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeCourse(courses.selectedCourse.id));
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
