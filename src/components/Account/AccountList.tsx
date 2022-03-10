import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";

export type userListProps = {
  onSelect?: (user: IUser) => void;
  children?: React.ReactNode;
};

function AccountList(props: userListProps): JSX.Element  {
  const users: IUserState = useSelector((state: IStateType) => state.users);

  const userElements: (JSX.Element | null)[] = users.admins.map(admin_item => {
    if (!admin_item) { return null; }
    return (<tr className={`table-row ${(users.selectedUser&& users.selectedUser.id === admin_item.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(admin_item);
      }}
      key={`admin_${admin_item.id}`}>
      <th scope="row">{admin_item.id}</th>
      <td>{admin_item.fullName}</td>
      <td>{admin_item.email}</td>
      <td>{admin_item.sex}</td>
      <td>{admin_item.dateOfDay}</td>
      <td>{admin_item.address}</td>
      <td>{admin_item.phone}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {userElements}
        </tbody>
      </table>
    </div>

  );
}

export default AccountList;
