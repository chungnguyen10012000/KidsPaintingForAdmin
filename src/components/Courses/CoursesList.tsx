import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseState } from "../../store/models/root.interface";
import { ICourse } from "../../store/models/courses.interface";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

function CoursesList(props: courseListProps): JSX.Element  {
const courses: ICourseState = useSelector((state: IStateType) => state.courses);

  const [data, setData] = useState<ICourse[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/course')
    .then(res => res.json())
    .then(x => {
      setData(x)
    })
  })
  
  const courseElements: (JSX.Element | null)[] = data.map(course => {
    if (!course) { return null; }
    return (<tr className={`table-row ${(courses.selectedCourse && courses.selectedCourse.courseId === course.courseId) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(course);
      }}
      key={`course_${course.courseId}`}>
      <th scope="row">{course.courseId}</th>
      <td>{course.courseName}</td>
      <td>{course.courseType}</td>
      <td>{course.courseLevel}</td>
      <td>{course.coursePrice}</td>
      <td>{course.maxCourseParticipant}</td>
      <td>{course.sumOfSection}</td>
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
            <th scope="col">Số học sinh tham gia tối đa</th>
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
