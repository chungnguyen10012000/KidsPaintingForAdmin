import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ReviewBlog from "./ReviewBlog";
import ReviewSemester from "./ReviewSemester";
//import { getRestApiWithToken, getDomain, postRestApiWithToken } from "../../common/util/RestAPI.util";
//import { Page } from "../../common/util/User.util";
//import { RestApiAuth } from "../../common/components/RestApiAuth";
import TeacherOfCourse from "./TeacherOfCourse"

const data = [
  {
    "username": "teacher",
    "className": "CM-1",
    "timeOff": "Tiết 7, Tiết 8 (2022-04-02)",
    "timeAdd": "Tiết 7, Tiết 8 (2022-04-06)"
  }, 
  {
    "username": "binhtranh2k",
    "className": "CM-2",
    "timeOff": "Tiết 7, Tiết 8 (2022-04-06)",
    "timeAdd": "Tiết 7, Tiết 8 (2022-04-08)"
  }, 
]

const RequestForTeacher: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Người dùng", "Danh sách"));

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

/*   fetch("/api/v1/user", {
    method: "GET"
  })
    .then ( (res: any) => res.json())
    .then (data => console.log(data)) */



  const userElements: JSX.Element[] = data.map((ele, index)=> {
    return (
      <tr className={`table-row`}
        key={`user_${index}`}>
        <th scope="row">{index + 1}</th>
        <td>{ele.username}</td>
        <td>{ele.className}</td>
        <td>{ele.timeOff}</td>
        <td>{ele.timeAdd}</td>
        <td>
            <button className="btn btn-success" >Chấp nhận</button> 
        </td>
        <td>
            <button className="btn btn-danger">Xóa</button>
        </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Yêu cầu nghỉ dạy</h6>
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
                      <th scope="col">Lớp</th>
                      <th scope="col">Thời gian nghỉ</th>
                      <th scope="col">Thời gian dạy bù</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
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

      <TeacherOfCourse />

      {
        function () {
          if (localStorage.getItem('role') === 'ROLE_ADMIN' || localStorage.getItem('role') === 'ROLE_SUPER_ADMIN'){
            return (
              <>
                <ReviewBlog />
                <ReviewSemester />
              </>
            )
          }
        } ()
      }

    </Fragment >
  );
};

export default RequestForTeacher;
