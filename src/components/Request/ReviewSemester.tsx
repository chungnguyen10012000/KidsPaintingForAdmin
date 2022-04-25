import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSemester } from "../../common/service/semester/getSemester";
import { ISemesterState, IStateType } from "../../store/models/root.interface";
import "./ReviewBlog.css"

const ReviewSemester: React.FC = () => {



    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);

    useEffect(() => {
        dispatch(getSemester())
    }, [dispatch])

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


    const userElements: JSX.Element[] = semesters.semesters.map((ele, index) => {
        return (
            <tr className={`table-row`}
                key={`user_${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{ele.name}</td>
                <td>{ele.start_time}</td>
                <td>{ele.end_time}</td>
                <td>{ele.year}</td>
                <td><button className="btn btn-success" >Chấp nhận</button> </td>
                <td><button className="btn btn-danger" >Xóa</button> </td>
            </tr>);
    });

    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Yêu cầu xác nhận học kì</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive portlet">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên học kì</th>
                                            <th scope="col">Từ</th>
                                            <th scope="col">Đến</th>
                                            <th scope="col">Năm học</th>
                                            <th scope="col">Cấp quyền</th>
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
        </Fragment >
    );
};

export default ReviewSemester;
