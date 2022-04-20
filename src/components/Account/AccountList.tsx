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
        </thead>
        <tbody>
          {
            function(){
              for (let index = 0; index < users.users.length; index++) {
                console.log(users.users[index], localStorage.getItem('email'))
                if (users.users[index].username === "chung123") {
                  return (
                    <>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Tên đăng nhập</th>
                        <td>{users.users[index].username}</td>
                      </tr>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Email</th>
                        <td>{users.users[index].email}</td>
                      </tr>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Giới tính</th>
                        <td>{users.users[index].sex}</td>
                      </tr>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Ngày sinh</th>
                        <td>{users.users[index].dateOfDay}</td>
                      </tr>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Địa chỉ</th>
                        <td>{users.users[index].address}</td>
                      </tr>
                      <tr 
                        className={`table-col`}
                        key={`admin_${index}`}
                      >
                        <th scope="row">Số điện thoại</th>
                        <td>{users.users[index].phone}</td>
                      </tr>
                    
                    
                  
                  </>
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
