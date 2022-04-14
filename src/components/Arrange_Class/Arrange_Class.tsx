import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
//import { getRestApiWithToken, getDomain, postRestApiWithToken } from "../../common/util/RestAPI.util";
//import { Page } from "../../common/util/User.util";
//import { RestApiAuth } from "../../common/components/RestApiAuth";
import TeacherOfCourse from "../Courses/TeacherOfCourse"
import TeacherSigupClass from "../MyClass/TeacherSigupClass";

const data = [
    {
        "name": "Khóa học chì màu dành cho trẻ 5-9 tuổi",
        "schedule_time": "",
    },
]


const ArrangeClass: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Xếp lớp", ""));

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



    const userElements: JSX.Element[] = data.map((ele, index) => {
        return (
            <tr className={`table-row`}
                key={`user_${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{ele.name}</td>
                <td>10</td>
                <td>
                    <button className="btn btn-success" >Xếp ngẫu nhiên</button>
                </td>

            </tr>);
    });

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Xếp lớp</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"></h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive portlet">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên khóa học</th>
                                            <th scope="col">Số lượng giáo viên đăng ký</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userElements}
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

export default ArrangeClass;
