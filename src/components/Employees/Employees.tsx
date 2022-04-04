import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IEmployee } from "../../store/models/employee.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { removeEmployee } from "../../store/actions/employee.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import EmployeeForm from "./EmployeesForm";
import { addNotification } from "../../store/actions/notifications.action";

const Employees: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Nhân viên", "Danh sách"));
  
  const users: IEmployee[] = useSelector((state: IStateType) => state.employees.employees);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm)

  function removeEmployees(employee: IEmployee): void {
    dispatch(addNotification("Nhân viên", ` ${employee.username} đã bị xóa khỏi hệ thống`));
    dispatch(removeEmployee(employee.id)); 
  }

  // const [listStaff, setListStaff] = useState<any[]>([])

  // useEffect(() => {
  //   let pathUsers = getDomain('user?role=ROLE_STAFF')
  //   let token: string | null = localStorage.getItem('access_token');
  //   if (token != null) {
  //     getRestApiWithToken(pathUsers, token)
  //       .then(res => {
  //         return RestApiAuth(res);
  //       })
  //       .then( (data: Page) => {
  //         setListStaff(data.items)
  //       })
  //     }
  // }, [])

  const userElements: JSX.Element[] = users.map(user => {
    return (
      <tr className={`table-row`}
        key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.username}</td>
        <td><button className="btn btn-danger" onClick={() => removeEmployees(user)}>Xóa</button> </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Nhân viên</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="NHÂN VIÊN" text={users.length.toString()} icon="user" class="danger" />
        <div className="col-xl-6 col-md-6 mb-4">
            <div className="card-body">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleChange}
                style={{width: '100%'}}
              />
            </div>
        </div>
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
      <div className="row">
          <EmployeeForm />
      </div>
    </Fragment >
  );
};

export default Employees;

