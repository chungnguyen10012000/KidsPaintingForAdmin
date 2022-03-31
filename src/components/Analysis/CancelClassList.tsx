import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseState } from "../../store/models/root.interface";
import { ICourse } from "../../store/models/courses.interface";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

function CancelClassList(props: courseListProps): JSX.Element  {
const courses: ICourseState = useSelector((state: IStateType) => state.courses);

  
  const courseElements: (JSX.Element | null)[] = courses.courses.map(course => {
    if (!course) { return null; }
    return (<tr className={`table-row ${(courses.selectedCourse && courses.selectedCourse.courseId === course.courseId) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(course);
      }}
      key={`course_${course.courseId}`}>
      <th scope="row">{course.courseId}</th>
      <td>{course.courseName}</td>
      <td>3</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khóa học</th>
            <th scope="col">Số lớp hủy</th>
          </tr>
        </thead>
        <tbody>
          {courseElements}
        </tbody>
      </table>
    </div>

  );
}

export default CancelClassList;
