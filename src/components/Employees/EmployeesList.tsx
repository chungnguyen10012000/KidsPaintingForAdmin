import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IEmployeeState } from "../../store/models/root.interface";
import { IEmployee } from "../../store/models/employee.interface";

export type userListProps = {
  onSelect?: (user: IEmployee) => void;
  children?: React.ReactNode;
};

function EmployeeList(props: userListProps): JSX.Element  {
  const users: IEmployeeState = useSelector((state: IStateType) => state.employees);

  const userElements: (JSX.Element | null)[] = users.employees.map(user => {
    if (!user) { return null; }
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === user.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(user);
      }}
      key={`user_${user.id}`}>
      <th scope="row">{user.id}</th>
      <td>{user.username}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên đăng nhập</th>
          </tr>
        </thead>
        <tbody>
          {userElements}
        </tbody>
      </table>
    </div>

  );
}

export default EmployeeList;
