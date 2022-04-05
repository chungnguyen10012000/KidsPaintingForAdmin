import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseForYearState } from "../../store/models/root.interface";
import { ICourseForYear } from "../../store/models/courseForYear.interface";

export type courseListProps = {
    onSelect?: (course: ICourseForYear) => void;
    children?: React.ReactNode;
};

function CoursesForYearList(props: courseListProps): JSX.Element {
    const courses: ICourseForYearState = useSelector((state: IStateType) => state.courseForYear);


    const courseElements: (JSX.Element | null)[] = courses.courseForYear.map(course => {
        if (!course) { return null; }
        return (<tr className={`table-row ${(courses.selectedCourseForYear && courses.selectedCourseForYear.courseId === course.courseId) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(course);
            }}
            key={`course_${course.courseId}`}>
            <th scope="row">{course.courseId}</th>
            <td>{course.courseName}</td>
            <td>{course.semester}</td>
            <td>{course.time}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên khóa học</th>
                        <th scope="col">Học kì</th>
                        <th scope="col">Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {courseElements}
                </tbody>
            </table>
        </div>

    );
}

export default CoursesForYearList;
