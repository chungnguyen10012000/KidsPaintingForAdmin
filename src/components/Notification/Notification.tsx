import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";
import './Notification.css'

type role = {
    id: string;
};

const Notification: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Thông báo", "Danh sách"));

    const { id } = useParams<role>()
  
    let history = useHistory();


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Danh sách thông báo</h1>

            <div className="row" onClick={() => {
                history.push({
                    pathname: `/${id}/notification-detail`,
                  })
            }}>
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Thông báo bảo trì hệ thống</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body has-view">
                            <p>Hệ thống sẽ được bảo trì vào xxx. Mong người dùng thông cảm</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Tổ chức cuộc thi vẽ 'Đề tài cha mẹ'</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Nhằm tạo ra sân chơi giao lưu học hỏi cho các bé. Chúng tôi đã mở cuộc thi ...</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default Notification;
