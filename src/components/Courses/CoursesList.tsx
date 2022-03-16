import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseState } from "../../store/models/root.interface";
import { ICourse } from "../../store/models/courses.interface";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

function CoursesList(props: courseListProps): JSX.Element  {
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);

  const courseElements: (JSX.Element | null)[] = courses.courses.map(course => {
    if (!course) { return null; }
    return (<tr className={`table-row ${(courses.selectedCourse && courses.selectedCourse.id === course.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(course);
      }}
      key={`course_${course.id}`}>
      <th scope="row">{course.id}</th>
      <td>{course.name}</td>
      <td>{course.type}</td>
      <td>{course.level}</td>
      <td>{course.price}</td>
      <td>{course.amount}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khóa học</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Mức độ</th>
            <th scope="col">Giá</th>
            <th scope="col">Số buổi học</th>
          </tr>
        </thead>
        <tbody>
          {courseElements}
        </tbody>
      </table>
    </div>

  );
}

export default CoursesList;
