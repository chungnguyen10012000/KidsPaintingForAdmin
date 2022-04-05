import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
//import { getRestApiWithToken, getDomain, postRestApiWithToken } from "../../common/util/RestAPI.util";
//import { Page } from "../../common/util/User.util";
//import { RestApiAuth } from "../../common/components/RestApiAuth";

const data = [
    {
        "username": "teacher",
        "class": "SM-1",
        "course": "Khóa học sơn dầu dành cho trẻ 9-12 tuổi"
    },
    {
        "username": "tranbinh2k",
        "class": "SM-2",
        "course": "Khóa học sơn dầu dành cho trẻ 9-12 tuổi"
    },
]

const TeacherSigupClass: React.FC = () => {



    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Giáo viên đăng ký", "Danh sách"));

    const userElements: JSX.Element[] = data.map((ele, index) => {
        return (
            <tr className={`table-row`}
                key={`user_${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{ele.username}</td>
                <td>{ele.class}</td>
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
                            <h6 className="m-0 font-weight-bold text-green">Xác nhận giáo viên dạy lớp</h6>
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
                                            <th scope="col">Lớp đăng ký</th>
                                            <th scope="col">Thuộc khóa học</th>
                                            <th scope="col">Cấp quyền</th>
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

export default TeacherSigupClass;
