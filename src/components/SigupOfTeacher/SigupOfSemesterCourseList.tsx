import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICourseSemesterState, ICourseState, IScheduleItemState, ILessonTimeState } from "../../store/models/root.interface";


function SigupCoursesSemesterList(): JSX.Element {
    const courseSemester: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const scheduleItems: IScheduleItemState = useSelector((state: IStateType) => state.scheduleItems);
    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);


    let courseList: string[] = []

    courseSemester.courseSemesters.map((course_semester_item) => {
        return courses.courses.forEach(element => {
            if (element.id === course_semester_item.course_id) {
                return courseList.push(element.name)
            }
        });
    })

    let scheduleItemList: any[] = []
    courseSemester.courseSemesters.map((course_semester_item) => {
        let x: any[] = []
        scheduleItems.scheduleItems.forEach(element => {
            if (element.schedule_id === course_semester_item.schedule_id) {
                x.push({'date_of_week': element.date_of_week, 'lesson_time': element.lesson_time})
            }
        });
        return scheduleItemList.push(x)
    })

    let dateOfWeek: any[] = []
    scheduleItemList.map((ele: any, index) => {
        let x: any[] = []
        ele.map((data: any) => {
            if (data.date_of_week === 1) {
                x.push('Thứ 2')
            }
            else if (data.date_of_week === 2){
                x.push('Thứ 3')
            }
            else if (data.date_of_week === 3){
                x.push('Thứ 4')
            }
            else if (data.date_of_week === 4){
                x.push('Thứ 5')
            }
            else if (data.date_of_week === 5){
                x.push('Thứ 6')
            }
            else if (data.date_of_week === 6){
                x.push('Thứ 7')
            }
            else if (data.date_of_week === 7){
                x.push('Chủ Nhật')
            }
            return x
        })
        return dateOfWeek.push(x)        
    })

    let lessonTimeList: any[] = []
    scheduleItemList.map((ele, index) => {
        let x: any[] = []
        ele.map((data: any) => {
            lessonTimes.lessonTimes.forEach(element => {
                if (element.id === data.lesson_time){
                    x.push(`${element.start_time} => ${element.end_time}`)
                }
            });
            return x
        })
        return lessonTimeList.push(x)
    })

    console.log(lessonTimeList)

    const courseElements: (JSX.Element | null)[] = courseSemester.courseSemesters.map((course, index) => {
        if (!course) { return null; }
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={index}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-green">{courseList[index]}</h6>
                                    <div className="header-buttons">
                                    </div>
                                </div>
                                <img className="card-img-top" src={require('../../assets/img/course/course_2.jpg')} alt=""></img>
                                <div className="card-body">
                                    <p className="card-text">Lịch dạy học: </p>
                                    {
                                            lessonTimeList[index].map((ele: any, idx: number) => {
                                                return (
                                                    <p className="card-text">{dateOfWeek[index][idx] + " ( " + ele + " )"}</p>
                                            )})

                                        
                                        
                                    }
                                    <button className="btn btn-success">Đăng kí</button>
                                </div>
                            </div>
                        </div>
        );
    });


    return (
        <>
            {courseElements}
        </>


    );
}

export default SigupCoursesSemesterList;
