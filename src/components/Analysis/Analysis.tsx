import React, { Fragment, Dispatch, useEffect } from "react";
import CoursesList from "./CourseList";
import CancelClassList from "./CancelClassList";
import "./Analysis.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

import { IStateType, IRootPageStateType } from "../../store/models/root.interface";

import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";

import { clearSelectedMytype } from "../../store/actions/mytypes.actions";
import { clearSelectedCourse, setModificationState, changeSelectedCourse } from "../../store/actions/courses.actions";
import { clearSelectedLevel } from "../../store/actions/levels.actions";



const Analysis: React.FC = () => {
  // let history = useHistory();



  const dispatch: Dispatch<any> = useDispatch();
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

  useEffect(() => {
    dispatch(clearSelectedCourse());
    dispatch(clearSelectedLevel());
    dispatch(clearSelectedMytype());
    dispatch(updateCurrentPath("Thống kê", ""));
  }, [path.area, dispatch]);

  function onCourseSelect(course: ICourse): void {
    dispatch(changeSelectedCourse(course));
    dispatch(setModificationState(CourseModificationStatus.None));
  }







  //console.log(isCheck)

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Thống kê</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học ít học viên nhất</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <CoursesList
                onSelect={onCourseSelect}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học nhiều học viên nhất</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <CoursesList
                onSelect={onCourseSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Số lớp bị hủy trong một khóa học</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <CancelClassList
                onSelect={onCourseSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default Analysis;
