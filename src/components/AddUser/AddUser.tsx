import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IRootPageStateType, IStateType, IUserState } from "../../store/models/root.interface";
import { removeUser, setModificationState } from "../../store/actions/users/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";
import { fetchProducts } from "../../store/actions/users/fetchDataUser";
import { getCourse } from "../../store/actions/course/getCourse";
import AddUserForm from "./AddUserForm";

const AddUser: React.FC = () => {

  const [typeUser, setTypeUser] = useState("Giáo viên")
  localStorage.setItem('typeUserAdd', typeUser)

  const dispatch: Dispatch<any> = useDispatch();
  const users: IUserState = useSelector((state: IStateType) => state.users);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCourse())
  }, [dispatch])


  useEffect(() => {
    dispatch(updateCurrentPath("Người dùng", ""));
  }, [path.area, dispatch]);

  //const users: IUser[] = useSelector((state: IStateType) => state.users.users);


  function removeTeacher(teacher: IUser): void {
    dispatch(addNotification("Người dùng", ` ${teacher.email} đã bị xóa khỏi hệ thống`));
    dispatch(removeUser(teacher.id));
  }

  const userElements: JSX.Element[] = users.users.map((ele, index) => {
    return (
      <tr className={`table-row`}
        key={`user_${index}`}>
        <th scope="row">{ele.id}</th>
        <td>{ele.username}</td>
        <td><button className="btn btn-danger" onClick={() => removeTeacher(ele)}>Xóa</button> </td>
      </tr>);
  });

  let listUser: string[] = []

  if (localStorage.getItem('role') === "ROLE_SUPER_ADMIN") {
    listUser = ['Quản trị viên', 'Nhân viên', 'Giáo viên']
  }
  else if (localStorage.getItem('role') === "ROLE_ADMIN") {
    listUser = ['Nhân viên', 'Giáo viên']
  }
  else if (localStorage.getItem('role') === 'ROLE_STAFF') {
    listUser = ['Giáo viên']
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Thêm người dùng</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        {
          function () {
            if (localStorage.getItem('role') === "ROLE_SUPER_ADMIN") {
              return (
                <>
                  <TopCard title="GIÁO VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                  <TopCard title="NHÂN VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                  <TopCard title="QUẢN TRỊ VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                </>
              )
            }
            else if (localStorage.getItem('role') === "ROLE_ADMIN") {
              return (
                <>
                  <TopCard title="GIÁO VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                  <TopCard title="NHÂN VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                </>
              )
            }
            else if (localStorage.getItem('role') === "ROLE_STAFF") {
              return (
                <>
                  <TopCard title="GIÁO VIÊN" text={users.users.length.toString()} icon="user" class="danger" />
                </>
              )
            }
          }()
        }
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
                    options={listUser}
                    required={true}
                    onChange={(text: any) => {
                      localStorage.removeItem('typeUserAdd')
                      localStorage.setItem('typeUserAdd', text.value)
                      setTypeUser(text.value)
                    }}
                    value={typeUser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <button className="btn btn-success btn-green btn-create" onClick={() =>
            dispatch(setModificationState(UserModificationStatus.Create))}>
            <i className="fas fa fa-plus"></i>
            Thêm người dùng
          </button>
        </div>
        {
          console.log(users.modificationState)
        }

        {((users.modificationState === UserModificationStatus.Create)) ?
          <AddUserForm /> : null}
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách {typeUser}</h6>
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
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="">1</a></li>
                    <li className="page-item"><a className="page-link" href="">2</a></li>
                    <li className="page-item"><a className="page-link" href="">3</a></li>
                    <li className="page-item"><a className="page-link" href="">Next</a></li>
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

export default AddUser;
