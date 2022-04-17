import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseSemesterState } from "../../store/models/root.interface";
import { ICourseSemester } from "../../store/models/course_for_semester.interface";

export type courseListProps = {
    onSelect?: (course: ICourseSemester) => void;
    children?: React.ReactNode;
};

function CoursesSemesterList(props: courseListProps): JSX.Element {
    const courseSemester: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);


    const courseElements: (JSX.Element | null)[] = courseSemester.courseSemesters.map(course => {
        if (!course) { return null; }
        return (<tr className={`table-row ${(courseSemester.selectedCourseSemester && courseSemester.selectedCourseSemester.id === course.id) ? "selected" : ""}`}
            onClick={() => {
                if (props.onSelect) props.onSelect(course);
            }}
            key={`course_${course.id}`}>
            <th scope="row">{course.id}</th>
            <td>{course.course_id}</td>
            <td>{course.schedule_id}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Thuộc lịch</th>
                    </tr>
                </thead>
                <tbody>
                    {courseElements}
                </tbody>
            </table>
        </div>

    );
}

export default CoursesSemesterList;
