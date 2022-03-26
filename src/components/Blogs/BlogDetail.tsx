import React, { Fragment, Dispatch } from "react";
import { IBlog } from "../../store/models/blogs.innterface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useLocation } from "react-router-dom";

const BlogDetail: React.FC = () => {

    let location = useLocation()
    let { body } = location.state
    console.log(body)

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Phản hồi", "Chi tiết"));
  
  const blogs: IBlog[] = useSelector((state: IStateType) => state.blogs.blogs);

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
            <div className="card-body" dangerouslySetInnerHTML={{ __html: body }}/>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default BlogDetail;
