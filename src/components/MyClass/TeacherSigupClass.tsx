import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { removeUser } from "../../store/actions/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { addNotification } from "../../store/actions/notifications.action";
//import { getRestApiWithToken, getDomain, postRestApiWithToken } from "../../common/util/RestAPI.util";
//import { Page } from "../../common/util/User.util";
//import { RestApiAuth } from "../../common/components/RestApiAuth";

const TeacherSigupClass: React.FC = () => {



    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Giáo viên đăng ký", "Danh sách"));
    const users: IUser[] = useSelector((state: IStateType) => state.users.users);

    const [searchTerm, setSearchTerm] = React.useState("");
    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)

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


    function removeTeacher(teacher: IUser): void {
        dispatch(addNotification("Giáo viên", ` ${teacher.email} đã bị xóa khỏi hệ thống`));
        dispatch(removeUser(teacher.id));
    }

    const userElements: JSX.Element[] = users.map(ele => {
        return (
            <tr className={`table-row`}
                key={`user_${ele.id}`}>
                <th scope="row">{ele.id}</th>
                <td>{ele.username}</td>
                <td><button className="btn btn-success" onClick={() => removeTeacher(ele)}>Chấp nhận</button> </td>
            </tr>);
    });

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <TopCard title="GIÁO VIÊN ĐĂNG KÝ" text={users.length.toString()} icon="user" class="danger" />
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card-body">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên đăng ký</h6>
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
