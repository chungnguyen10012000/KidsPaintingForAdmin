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
  console.log(users)

  const userElements: (JSX.Element | null)[] = users.users.map( (admin_item, index) => {
    if (!admin_item) { return null; }
    return (<tr className={`table-row`}
      key={`admin_${index}`}>
      <th scope="row">{index}</th>
      <td>{admin_item.username}</td>
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
            <th scope="col">Tên đăng nhập</th>
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
