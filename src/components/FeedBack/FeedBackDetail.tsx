import React, { Fragment, Dispatch } from "react";
import { IFeedBack } from "../../store/models/feedback.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useLocation } from "react-router-dom";

const FeedBackDetail: React.FC = () => {

    let location = useLocation()
    let { content } = location.state

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Phản hồi", "Chi tiết"));
  
  const blogs: IFeedBack[] = useSelector((state: IStateType) => state.feedbacks.feedbacks);

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
                {
                    content
                }
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default FeedBackDetail;
