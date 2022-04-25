import React, { Fragment, Dispatch, useEffect } from "react";
import "./SigupOfCourse.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { getCourseSemester } from "../../common/service/course_semester/getCourseSemester";
import SigupCoursesSemesterList from "./SigupOfSemesterCourseList";
import { getCourse } from "../../common/service/course/getCourse";
import { getSchedule } from "../../common/service/schedule/getSchedule";
import { getScheduleItem } from "../../common/service/schedule_item/getScheduleItem";
import { getLessonTime } from "../../common/service/lesson_time/getLessonTime";

const SigupOfCourse: React.FC = () => {
  //console.log(id)
/*   let isId: number = 0;

  let history = useHistory(); */

  const dispatch: Dispatch<any> = useDispatch();
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

  useEffect(() => {
    dispatch(getCourse())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseSemester())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getSchedule())
  }, [dispatch])

  useEffect(() => {
    dispatch(getScheduleItem())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLessonTime())
  }, [dispatch])

  useEffect(() => {
    dispatch(updateCurrentPath("Khóa học", "Danh sách"));
  }, [path.area, dispatch]);

    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Đăng ký</h1>
        <p className="mb-4">Thông tin chung</p>

        <h6 className="mb-4 font-weight-bold text-green">Danh sách khóa học</h6>
  
        <div className="row">
          <SigupCoursesSemesterList />
        </div>
      </Fragment >
    );
};

export default SigupOfCourse;
