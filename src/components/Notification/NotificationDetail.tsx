import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

const NotificationDetail: React.FC = () => {


  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Thông báo", "Chi tiết"));

  return (
    <Fragment>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Chi tiết</h6>
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

export default NotificationDetail;
