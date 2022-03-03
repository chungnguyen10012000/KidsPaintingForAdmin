import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CoursesList from "./CoursesList";
import CoursesForm from "./CoursesForm";
import TopCard from "../../common/components/TopCard";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ICourseState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeCourse, clearSelectedCourse, setModificationState,
  changeSelectedCourse } from "../../store/actions/courses.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";

const Courses: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = courses.courses.length;
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedCourse());
    dispatch(updateCurrentPath("Giáo viên", "Danh sách"));
  }, [path.area, dispatch]);

  function onCourseSelect(course: ICourse): void {
    dispatch(changeSelectedCourse(course));
    dispatch(setModificationState(CourseModificationStatus.None));
  }

  function onCourseRemove() {
    if(courses.selectedCourse) {
      setPopup(true);
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
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(CourseModificationStatus.Create))}>
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
        {((courses.modificationState === CourseModificationStatus.Create)
          || (courses.modificationState === CourseModificationStatus.Edit && courses.selectedCourse)) ?
          <CoursesForm /> : null}
      </div>


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
