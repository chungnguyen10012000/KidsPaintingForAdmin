import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { addUser, removeUser } from "../../store/actions/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";

const Users: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Người dùng", "Danh sách"));
  
  const users: IUser[] = useSelector((state: IStateType) => state.users.users);
  const admins: IUser[] = useSelector((state: IStateType) => state.users.admins);

  function setUserAdmin(user: IUser): void {
    dispatch(addUser(user));
  }

  function setUserNotAdmin(admin: IUser): void {
    dispatch(removeUser(admin)); 
  }

  const userElements: JSX.Element[] = users.map(user => {
    return (
      <tr className={`table-row`}
        key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td><button className="btn btn-success" onClick={() => setUserAdmin(user)}>Gán admin</button> </td>
      </tr>);
  });

  const adminElements: JSX.Element[] = admins.map(admin => {
    return (
      <tr className={`table-row`}
        key={`user_${admin.id}`}>
        <th scope="row">{admin.id}</th>
        <td>{admin.fullName}</td>
        <td>{admin.email}</td>
        <td><button className="btn btn-danger" onClick={() => setUserNotAdmin(admin)}>Xóa admin</button> </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Người dùng</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="ADMINS" text={admins.length.toString()} icon="user-tie" class="primary" />
        <TopCard title="Người dùng" text={users.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách admin</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Email</th>
                      <th scope="col">Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách người dùng</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Email</th>
                      <th scope="col">Admin</th>
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

export default Users;
