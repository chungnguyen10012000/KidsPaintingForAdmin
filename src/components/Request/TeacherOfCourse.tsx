import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
//import { getRestApiWithToken, getDomain, postRestApiWithToken } from "../../common/util/RestAPI.util";
//import { Page } from "../../common/util/User.util";
//import { RestApiAuth } from "../../common/components/RestApiAuth";

const data = [{
  "username": "teacher",
  "course": "Khóa học sơn dầu dành cho trẻ 9-12 tuổi"
}]

const Teachers: React.FC = () => {



  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu", "Danh sách"));

  // useEffect(() => {
  //   let pathUsers = getDomain('user?role=ROLE_TEACHER')
  //   let token: string | null = localStorage.getItem('access_token');
  //   if (token != null) {
  //     getRestApiWithToken(pathUsers, token)
  //       .then(res => {
  //         return RestApiAuth(res);
  //       })
  //       .then( (data: Page) => {
  //         setListUser(data.items)
  //       })
  //     }
  // }, [])


  const userElements: JSX.Element[] = data.map((ele, index) => {
    return (
      <tr className={`table-row`}
        key={`user_${index}`}>
        <th scope="row">{index + 1}</th>
        <td>{ele.username}</td>
        <td>{ele.course}</td>
        <td><button className="btn btn-success" >Chấp nhận</button> </td>
      </tr>);
  });

  return (
    <Fragment>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Yêu cầu xác nhận trình độ</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên đăng nhập</th>
                      <th scope="col">Khóa học</th>
                      <th scope="col">Cấp quyền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userElements}
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

export default Teachers;
