import React, { Fragment, Dispatch, useEffect } from "react";
import "./SigupLevelTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedCourse, setModificationState,
    changeSelectedCourse
} from "../../store/actions/course/courses.actions";
import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";
import SigupLevelTeacherList from "./SigupLevelTeacherList";

const SigupLevelTeacher: React.FC = () => {
    //console.log(id)
    /*   let isId: number = 0;
    
      let history = useHistory(); */

    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(clearSelectedCourse());
        dispatch(updateCurrentPath("Lớp", "Danh sách"));
    }, [path.area, dispatch]);

    function onCourseSelect(course: ICourse): void {
        dispatch(changeSelectedCourse(course));
        dispatch(setModificationState(CourseModificationStatus.None));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Đăng ký</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách trình độ</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <SigupLevelTeacherList
                                onSelect={onCourseSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default SigupLevelTeacher;
