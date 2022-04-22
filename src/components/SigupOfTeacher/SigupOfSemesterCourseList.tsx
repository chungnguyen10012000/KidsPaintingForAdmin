import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseSemesterState, ICourseState, IScheduleState } from "../../store/models/root.interface";

function SigupCoursesSemesterList(): JSX.Element {
    const courseSemester: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);

    let courseList : string[] = []

    courseSemester.courseSemesters.map ((course_semester_item) => {
        return courses.courses.forEach(element => {
            if (element.id === course_semester_item.course_id){
                return courseList.push(element.name)
            }
        });
    })

    let scheduleList: string[] = []
    courseSemester.courseSemesters.map ((course_semester_item) => {
        return schedules.schedules.forEach(element => {
            if (element.id === course_semester_item.schedule_id){
                return scheduleList.push(element.name)
            }
        });
    })


    const courseElements: (JSX.Element | null)[] = courseSemester.courseSemesters.map((course, index) => {
        if (!course) { return null; }
        return (<tr className={`table-row ${(courseSemester.selectedCourseSemester && courseSemester.selectedCourseSemester.id === course.id) ? "selected" : ""}`}
            key={`course_${course.id}`}>
            <th scope="row">{index}</th>
            <td>{courseList[index]}</td>
            <td>{scheduleList[index]}</td>
            <td>
              <button className="btn btn-success">Đăng ký</button>
            </td>
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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {courseElements}
                </tbody>
            </table>
        </div>

    );
}

export default SigupCoursesSemesterList;
