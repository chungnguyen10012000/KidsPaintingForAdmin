import React, { Fragment, Dispatch, useState } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { removeUser } from "../../store/actions/users/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TeacherForm from "./AddUserForm";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";

const AddUser: React.FC = () => {

  const [typeUser, setTypeUser] = useState("Giáo viên")

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Người dùng", ""));
  const users: IUser[] = useSelector((state: IStateType) => state.users.users);


  function removeTeacher(teacher: IUser): void {
    dispatch(addNotification("Người dùng", ` ${teacher.email} đã bị xóa khỏi hệ thống`));
    dispatch(removeUser(teacher.id));
  }

  const userElements: JSX.Element[] = users.map( ele => {
    return (
      <tr className={`table-row`}
        key={`user_${ele.id}`}>
        <th scope="row">{ele.id}</th>
        <td>{ele.username}</td>
        <td><button className="btn btn-danger" onClick={() => removeTeacher(ele)}>Xóa</button> </td>
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
            <div className="card-body">
            <form >
              <div className="form-group">
                <SelectInput
                  id="input_course"
                  field="course"
                  label="Loại"
                  options={["Giáo viên", "Nhân viên"]}
                  required={true}
                  onChange={(text: string) => setTypeUser(text)}
                  value={typeUser}
                />
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>

{/*       <div className="row">
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
      </div> */}

      <div className="row">
        <TeacherForm />
      </div>
    </Fragment >
  );
};

export default AddUser;
