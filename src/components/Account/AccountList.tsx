import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";

export type userListProps = {
  onSelect?: (user: IUser) => void;
  children?: React.ReactNode;
};

function AccountList(props: userListProps): JSX.Element {
  const users: IUserState = useSelector((state: IStateType) => state.users);

  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Tên đăng nhập</th>
            <th scope="col">Email</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {
            function(){
              for (let index = 0; index < users.users.length; index++) {
                console.log(users.users[index], localStorage.getItem('email'))
                if (users.users[index].username === localStorage.getItem('email')) {
                  return (<tr className={`table-row`}
                    key={`admin_${index}`}>
                    <td>{users.users[index].username}</td>
                    <td>{users.users[index].email}</td>
                    <td>{users.users[index].sex}</td>
                    <td>{users.users[index].dateOfDay}</td>
                    <td>{users.users[index].address}</td>
                    <td>{users.users[index].phone}</td>
                  </tr>
                  );
                }
              }
            }()
          }
        </tbody>
      </table>
    </div>

  );
}

export default AccountList;
