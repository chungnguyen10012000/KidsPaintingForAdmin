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
    removeSemester, clearSelectedSemester, setModificationState,
    changeSelectedSemester
} from "../../store/actions/semester/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { SemesterModificationStatus, ISemester } from "../../store/models/semester.interface";

type role = {
    id: string;
};

const Semester: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = semesters.semesters.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)

    useEffect(() => {
        dispatch(clearSelectedSemester());
        dispatch(updateCurrentPath("Lớp", "Danh sách"));
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
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách tiết học</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() =>
                                    dispatch(setModificationState(SemesterModificationStatus.Create))}>
                                    <i className="fas fa fa-plus"></i>
                                </button>
                                <button className="btn btn-success btn-blue" onClick={() =>
                                    dispatch(setModificationState(SemesterModificationStatus.Edit))}>
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
                {((semesters.modificationState === SemesterModificationStatus.Create)
                    || (semesters.modificationState === SemesterModificationStatus.Edit && semesters.selectedSemester)) ?
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
                                dispatch(removeSemester(semesters.selectedSemester.id));
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
