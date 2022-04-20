import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TypeForm from "./TypeForm";
import LevelForm from "./LevelForm";
import TopCard from "../../common/components/TopCard";
import "./Art.css";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TypeList from "./TypeList";
import LevelList from "./LevelList";


import { ICourseState, ICourseSemesterState, IStateType, IRootPageStateType, IMytypeState, ILevelState } from "../../store/models/root.interface";

import { MytypeModificationStatus, IMytype } from "../../store/models/mytypes.interface";
import { LevelModificationStatus, ILevel } from "../../store/models/levels.interface";

import { clearSelectedMytype, changeSelectedMytype, setModificationStateMytype } from "../../store/actions/art_type/mytypes.actions";
import { removeCourse, clearSelectedCourse } from "../../store/actions/course/courses.actions";
import { clearSelectedLevel, changeSelectedLevel, setModificationStateLevel } from "../../store/actions/art_level/levels.actions";

import { removeCourseSemester, clearSelectedCourseSemester} from "../../store/actions/course_semester/course_for_semester.actions";
import { getArtType } from "../../store/actions/art_type/getArtType";
import { deleteArtType } from "../../store/actions/art_type/deleteArtType";
import { getLevel } from "../../store/actions/art_level/getLevel";
import { deleteLevel } from "../../store/actions/art_level/deleteLevel";


type role = {
    id: string;
};

const Art: React.FC = () => {

    const [popup, setPopup] = useState(false);
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [popup3, setPopup3] = useState(false);

    let [isCheck, setIsCheck] = useState('')

    const dispatch: Dispatch<any> = useDispatch();

    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
    const levels: ILevelState = useSelector((state: IStateType) => state.levels);
    const courseSemesters: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberLevelCount: number = levels.levels.length;
    const numberMyTypeCount: number = mytypes.mytypes.length;
    useEffect(() => {
        dispatch(getArtType())
    }, [dispatch])
    useEffect(() => {
        dispatch(getLevel())
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedCourse());
        dispatch(clearSelectedLevel());
        dispatch(clearSelectedMytype());
        dispatch(clearSelectedCourseSemester());
        dispatch(updateCurrentPath("Khóa học", "Danh sách"));
    }, [path.area, dispatch]);

    function onMytypeSelect(mytype: IMytype): void {
        dispatch(changeSelectedMytype(mytype));
        dispatch(setModificationStateMytype(MytypeModificationStatus.None));
    }

    function onLevelSelect(level: ILevel): void {
        dispatch(changeSelectedLevel(level));
        dispatch(setModificationStateLevel(LevelModificationStatus.None));
    }

    function onMytypeRemove() {
        if (mytypes.selectedMytype) {
            setPopup1(true);
        }
    }

    function onLevelRemove() {
        if (levels.selectedLevel) {
            setPopup2(true);
        }
    }



    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Mỹ thuật</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="TỔNG SỐ THỂ LOẠI" text={`${numberMyTypeCount}`} icon="box" class="primary" />
                <TopCard title="TỔNG SỐ MỨC ĐỘ" text={`${numberLevelCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách loại hình </h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green btn-createType" id="1" onClick={() => {
                                    setIsCheck('2')
                                    dispatch(setModificationStateMytype(MytypeModificationStatus.Create))
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                </button>
                                <button className="btn btn-success btn-blue btn-editType" onClick={() =>
                                    dispatch(setModificationStateMytype(MytypeModificationStatus.Edit))}>
                                    <i className="fas fa fa-pen"></i>
                                </button>
                                <button className="btn btn-success btn-red btn-removeType" onClick={() => onMytypeRemove()}>
                                    <i className="fas fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <TypeList
                                onSelect={onMytypeSelect}
                            />
                        </div>
                    </div>
                </div>
                {((mytypes.modificationState === MytypeModificationStatus.Create && isCheck === '2')
                    || (mytypes.modificationState === MytypeModificationStatus.Edit && mytypes.selectedMytype)) ?
                    <TypeForm /> : null}
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách mức độ </h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green btn-createType1" id="1" onClick={() => {
                                    setIsCheck('3')
                                    dispatch(setModificationStateLevel(LevelModificationStatus.Create))
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                </button>
                                <button className="btn btn-success btn-blue btn-editType1" onClick={() =>
                                    dispatch(setModificationStateLevel(LevelModificationStatus.Edit))}>
                                    <i className="fas fa fa-pen"></i>
                                </button>
                                <button className="btn btn-success btn-red btn-removeType1" onClick={() => onLevelRemove()}>
                                    <i className="fas fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <LevelList
                                onSelect={onLevelSelect}
                            />
                        </div>
                    </div>
                </div>
                {((levels.modificationState === LevelModificationStatus.Create && isCheck === '3')
                    || (levels.modificationState === LevelModificationStatus.Edit && levels.selectedLevel)) ?
                    <LevelForm /> : null}
            </div>

            <Popup
                className="popup-modal"
                open={popup3}
                onClose={() => setPopup3(false)}
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
                                if (!courseSemesters.selectedCourseSemester) {
                                    return;
                                }
                                dispatch(addNotification("Khóa học theo kỳ", `Đã bị xóa khỏi hệ thống`));
                                dispatch(removeCourseSemester(courseSemesters.selectedCourseSemester.id));
                                dispatch(clearSelectedCourseSemester());
                                setPopup3(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>

            <Popup
                className="popup-modal"
                open={popup2}
                onClose={() => setPopup2(false)}
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
                                if (!levels.selectedLevel) {
                                    return;
                                }
                                dispatch(addNotification("Mức độ", ` ${levels.selectedLevel.name} đã bị xóa khỏi hệ thống`));
                                dispatch(deleteLevel(levels.selectedLevel.id));
                                dispatch(clearSelectedLevel());
                                setPopup2(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>

            <Popup
                className="popup-modal"
                open={popup1}
                onClose={() => setPopup1(false)}
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
                                if (!mytypes.selectedMytype) {
                                    return;
                                }
                                dispatch(addNotification("Thể loại", ` ${mytypes.selectedMytype.name} đã bị xóa khỏi hệ thống`));
                                dispatch(deleteArtType(mytypes.selectedMytype.id));
                                dispatch(clearSelectedMytype());
                                setPopup1(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>


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
                                if (!courses.selectedCourse) {
                                    return;
                                }
                                dispatch(addNotification("Khóa học", ` ${courses.selectedCourse.name} đã bị xóa khỏi hệ thống`));
                                dispatch(removeCourse(courses.selectedCourse.id));
                                dispatch(clearSelectedCourse());
                                setPopup(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>
        </Fragment >
    );
};

export default Art;
