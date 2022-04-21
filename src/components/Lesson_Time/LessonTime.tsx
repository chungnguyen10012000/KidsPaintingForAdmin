import React, { Fragment, Dispatch, useState, useEffect } from "react";
import LessonTimeForm from "./LessonTimeForm";
import LessonTimeList from "./LessonTimeList";
import TopCard from "../../common/components/TopCard";
import "./LessonTime.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ILessonTimeState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedLessonTime, setModificationState,
    changeSelectedLessonTime
} from "../../store/actions/lesson_time/lesson_time.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { LessonTimeModificationStatus, ILessonTime } from "../../store/models/lesson_time.interface";
import { getLessonTime } from "../../store/actions/lesson_time/getLessonTime";
import { deleteLessonTime } from "../../store/actions/lesson_time/deleteLessonTime";

type role = {
    id: string;
};

const LessonTime: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = lessonTimes.lessonTimes.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)

    useEffect(() => {
        dispatch(getLessonTime())
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearSelectedLessonTime());
        dispatch(updateCurrentPath("Lớp", "Danh sách"));
    }, [path.area, dispatch]);

    function onLessonTimeSelect(lessonTime: ILessonTime): void {
        dispatch(changeSelectedLessonTime(lessonTime));
        dispatch(setModificationState(LessonTimeModificationStatus.None));
    }

    function onLessonTimeRemove() {
        if (lessonTimes.selectedLessonTime) {
            setPopup(true);
        }
    }

    const [isCheckOpen1, setIsCheckOpen1] = useState(false)
    const [isCheckOpen2, setIsCheckOpen2] = useState(false)

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Tiết học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="TỔNG SỐ TIẾT HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card-body">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationState(LessonTimeModificationStatus.Create))
                        setIsCheckOpen1(!isCheckOpen1)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Thêm tiết mới
                    </button>
                </div>

                {((lessonTimes.modificationState === LessonTimeModificationStatus.Create) && isCheckOpen1 === true) ?
                    <LessonTimeForm /> : null}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách tiết học</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-blue" onClick={() => {
                                    dispatch(setModificationState(LessonTimeModificationStatus.Edit))
                                    if (lessonTimes.selectedLessonTime){
                                        setIsCheckOpen2(!isCheckOpen2)
                                    }
                                }}>
                                    <i className="fas fa fa-pen"></i>
                                </button>
                                <button className="btn btn-success btn-red" onClick={() => onLessonTimeRemove()}>
                                    <i className="fas fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <LessonTimeList
                                onSelect={onLessonTimeSelect}
                            />
                        </div>
                    </div>
                </div>
                {((lessonTimes.modificationState === LessonTimeModificationStatus.Edit && lessonTimes.selectedLessonTime && isCheckOpen2 === true)) ?
                    <LessonTimeForm /> : null}
            </div>

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
                                if (!lessonTimes.selectedLessonTime) {
                                    return;
                                }
                                dispatch(addNotification("Tiết", ` từ ${lessonTimes.selectedLessonTime.start_time} đến ${lessonTimes.selectedLessonTime.end_time}  đã bị xóa khỏi hệ thống`));
                                dispatch(deleteLessonTime(lessonTimes.selectedLessonTime.id));
                                dispatch(clearSelectedLessonTime());
                                setPopup(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>
        </Fragment >
    );
};

export default LessonTime;
