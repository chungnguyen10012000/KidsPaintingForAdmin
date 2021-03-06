import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { IFeedBack } from "../../store/models/feedback.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory } from "react-router-dom";
import "./Feedback.css"
import { getFeedback } from "../../common/service/feedback/getFeedback";

type role = {
  id: string;
};

const FeedBack: React.FC = () => {

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Phản hồi", "Danh sách"));
  useEffect(() => {
    dispatch(getFeedback())
  }, [dispatch])
  
  const feedbacks: IFeedBack[] = useSelector((state: IStateType) => state.feedbacks.feedbacks);


  const blogElements: JSX.Element[] = feedbacks.map(feedback => {

    return (
      <tr className={`table-row`}
        key={`blog_${feedback.id}`}>
        <th scope="row">{feedback.id}</th>
        <td>{feedback.email}</td>
        <td><p>{feedback.content}</p></td>
        <td><button className="btn btn-success" onClick={() => {
            console.log('enter click')
            if (localStorage.getItem('role') === "ROLE_SUPER_ADMIN"){
              history.push({
                pathname: `/super-admin/feedback-detail`,
                state: { content : feedback.content}
              })
            }
            else if (localStorage.getItem('role') === "ROLE_ADMIN"){
              history.push({
                pathname: `/admin/feedback-detail`,
                state: { content : feedback.content}
              })
            }

            else if (localStorage.getItem('role') === "ROLE_STAFF"){
              history.push({
                pathname: `/employee/feedback-detail`,
                state: { content : feedback.content}
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
        <TopCard title="PHẢN HỒI" text={feedbacks.length.toString()} icon="user" class="danger" />
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
                      <th scope="col">Nội dung</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogElements}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="/">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                    <li className="page-item"><a className="page-link" href="/">Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default FeedBack;
