import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ICourseState, IMytypeState, ILevelState } from "../../store/models/root.interface";
import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";
import { useHistory, useParams } from "react-router-dom";
import { clearSelectedCourse, setModificationState } from "../../store/actions/courses.actions";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteCourse } from "../../common/service/course/deleteCourse";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

type role = {
  id: string;
};

function CoursesList(props: courseListProps): JSX.Element {

  const dispatch: Dispatch<any> = useDispatch();
  let history = useHistory();
  const { id } = useParams<role>()
  
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);

  let typeList: string[] = []

    courses.courses.map((course_item) => {
      return mytypes.mytypes.forEach(element => {
        if (element.id === course_item.art_type_id) {
          return typeList.push(element.name)
        }
      });
    })

  

  let levelList: string[] = []

    courses.courses.map((course_item) => {
      return levels.levels.forEach(element => {
        if (element.id === course_item.art_level_id) {
          return levelList.push(element.name)
        }
      });
    })

  const [popup, setPopup] = useState(false);
  const [course, setCourse] = useState<any>()

  function onCourseRemove(course: ICourse) {
    console.log('enter Remove')
    setPopup(true);
    setCourse(course)
  }


  const courseElements: (JSX.Element | null)[] = courses.courses.map((course_item, index) => {
    if (!course_item) { return null; }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{course_item.name}</h6>
            <div className="header-buttons">
            </div>
          </div>
          <img className="card-img-top" src={require('../../assets/img/contest/contest_1.png')} alt="" onClick={() => {
            history.push({
              pathname: `/${id}/course-detail`,
              state: { body: course_item.description }
            })
          }}></img>
          <div className="card-body">
            <p className="card-text">Thể loại: {typeList[index]}</p>
            <p className="card-text">Trình độ: {levelList[index]}</p>
            <p className="card-text">Số người tham gia tối đa: {course_item.max_participant}</p>
            <p className="card-text">Giá: {course_item.price}</p>
            <p className="card-text">Số buổi: {course_item.sum_of_section}</p>
            <button
              className="btn btn-success btn-blue"
              onClick={() => {
                if (props.onSelect) props.onSelect(course_item);
                dispatch(setModificationState(CourseModificationStatus.Edit))
                history.push({
                  pathname: `/${id}/edit-course`,
                  state: { body: course_item.description }
                })
              }
              }
            >
              <i className="fas fa fa-pen"></i>
              Chỉnh sửa</button>
            <button className="btn btn-success btn-red float-right" onClick={() => {
              onCourseRemove(course_item)
            }}>
              <i className="fas fa fa-times" ></i>
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  });


  return (
    <>
      {courseElements}
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
                if (!course) {
                  return;
                }
                dispatch(addNotification("Khóa học", ` ${course.name} đã bị xóa khỏi hệ thống`));
                dispatch(deleteCourse(course.id));
                dispatch(clearSelectedCourse());
                setPopup(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>
    </>

  );
}

export default CoursesList;
