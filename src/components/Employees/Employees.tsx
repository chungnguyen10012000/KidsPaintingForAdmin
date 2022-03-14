import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { removeUser } from "../../store/actions/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import EmployeeForm from "./EmployeesForm";
import { addNotification } from "../../store/actions/notifications.action";

const Employees: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Nhân viên", "Danh sách"));
  
  const users: IUser[] = useSelector((state: IStateType) => state.users.users);

  function removeEmployee(Employee: IUser): void {
    dispatch(addNotification("Nhân viên", ` ${Employee.email} đã bị xóa khỏi hệ thống`));
    dispatch(removeUser(Employee.id)); 
  }

  const userElements: JSX.Element[] = users.map(user => {
    return (
      <tr className={`table-row`}
        key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.email}</td>
        <td><button className="btn btn-success" onClick={() => removeEmployee(user)}>Xóa</button> </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Nhân viên</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="NHÂN VIÊN" text={users.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách Nhân viên</h6>
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
      <div className="row">
          <EmployeeForm />
      </div>
    </Fragment >
  );
};

export default Employees;
