import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SemesterForm from "./SemesterForm";
import SemesterList from "./SemesterList";
import TopCard from "../../common/components/TopCard";
import "./Semester.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISemesterState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedSemester, setModificationState,
    changeSelectedSemester
} from "../../store/actions/semester/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { SemesterModificationStatus, ISemester } from "../../store/models/semester.interface";
import { getSemester } from "../../store/actions/semester/getSemester";
import { deleteSemester } from "../../store/actions/semester/deleteSemester";

type role = {
    id: string;
};

const Semester: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = semesters.semesters.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCheckOpen1, setIsCheckOpen1] = useState(false)
    const [isCheckOpen2, setIsCheckOpen2] = useState(false)

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)

    useEffect(() => {
        dispatch(getSemester())
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedSemester());
        dispatch(updateCurrentPath("Học kì", "Danh sách"));
    }, [path.area, dispatch]);

    function onSemesterSelect(semester: ISemester): void {
        dispatch(changeSelectedSemester(semester));
        dispatch(setModificationState(SemesterModificationStatus.None));
    }

    function onSemesterRemove() {
        if (semesters.selectedSemester) {
            setPopup(true);
        }
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Học kì</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="TỔNG SỐ HỌC KÌ" text={`${numberItemsCount}`} icon="box" class="primary" />
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
                        dispatch(setModificationState(SemesterModificationStatus.Create))
                        setIsCheckOpen1(!isCheckOpen1)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Thêm học kì mới
                    </button>
                </div>

                {((semesters.modificationState === SemesterModificationStatus.Create) && isCheckOpen1 === true) ?
                    <SemesterForm /> : null}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách học kì</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-blue" onClick={() => {
                                    dispatch(setModificationState(SemesterModificationStatus.Edit))
                                    if (semesters.selectedSemester){
                                        setIsCheckOpen2(!isCheckOpen2)
                                    }
                                }}
                                >
                                    <i className="fas fa fa-pen"></i>
                                </button>
                                <button className="btn btn-success btn-red" onClick={() => onSemesterRemove()}>
                                    <i className="fas fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <SemesterList
                                onSelect={onSemesterSelect}
                            />
                        </div>
                    </div>
                </div>
                {((semesters.modificationState === SemesterModificationStatus.Edit && semesters.selectedSemester && isCheckOpen2 === true)) ?
                    <SemesterForm /> : null}
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
                                if (!semesters.selectedSemester) {
                                    return;
                                }
                                dispatch(addNotification("Học kì", ` ${semesters.selectedSemester.name} đã bị xóa khỏi hệ thống`));
                                dispatch(deleteSemester(semesters.selectedSemester.id));
                                dispatch(clearSelectedSemester());
                                setPopup(false);
                            }}>Xóa
                        </button>
                    </div>
                </div>
            </Popup>
        </Fragment >
    );
};

export default Semester;
