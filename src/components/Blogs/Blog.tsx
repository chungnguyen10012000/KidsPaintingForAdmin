import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IBlog } from "../../store/models/blog.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory, useParams } from "react-router-dom";

type role = {
  id: string;
};

const Blogs: React.FC = () => {

  const { id } = useParams<role>()

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Phản hồi", "Danh sách"));
  
  const blogs: IBlog[] = useSelector((state: IStateType) => state.blogs.blogs);


  const blogElements: JSX.Element[] = blogs.map(blog => {

    return (
      <tr className={`table-row`}
        key={`blog_${blog.id}`}>
        <th scope="row">{blog.id}</th>
        <td>{blog.email}</td>
        <td><button className="btn btn-success" onClick={() => {
            if (id === 'admin'){
              history.push({
                pathname: '/admin/feedback-detail',
                state: { id : blog.id}
              })
            }
            else if (id === "employee"){
              history.push({
                pathname: '/employee/feedback-detail',
                state: { id : blog.id}
              })
            }
          }}>Xem chi tiết</button> </td>
        {/* <td><button className="btn btn-danger" > {isCheckView === true ? 'Đã xem' : 'Chưa xem'}</button> </td> */}
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Phản hồi</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="PHẢN HỒI" text={blogs.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách phản hồi</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody id="xxx">
                    {blogElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default Blogs;
