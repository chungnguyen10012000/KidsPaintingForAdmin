import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

type role = {
    id: string;
};

const Notification: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Thông báo", "Danh sách"));




    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Danh sách thông báo</h1>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Thông báo nghỉ học</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Học sinh lớp CM-1 nghỉ học buổi 1</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Thông báo nghỉ học</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Học sinh lớp CM-1 nghỉ học buổi 1</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default Notification;
