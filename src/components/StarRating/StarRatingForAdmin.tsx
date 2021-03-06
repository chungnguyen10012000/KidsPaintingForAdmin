import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import "./StarRatingForAdmin.css"

const StarRatingForAdmin: React.FC = () => {


    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Đanh giá", "Danh sách"));
    const users: IUser[] = useSelector((state: IStateType) => state.users.users);


    const userElements: JSX.Element[] = users.map(ele => {
        return (
            <tr className={`table-row`}
                key={`user_${ele.id}`}>
                <th scope="row">{ele.id}</th>
                <td>{ele.username}</td>
                <td>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </td>
            </tr>);
    });

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <TopCard title="GIÁO VIÊN" text={users.length.toString()} icon="user" class="danger" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
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
                                            <th scope="col">Đánh giá</th>
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

export default StarRatingForAdmin;
