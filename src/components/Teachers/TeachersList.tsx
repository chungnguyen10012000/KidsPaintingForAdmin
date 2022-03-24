import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";
import { getDomain } from "../../common/util/RestAPI.util";

export type userListProps = {
  onSelect?: (user: IUser) => void;
  children?: React.ReactNode;
};

function ProductList(props: userListProps): JSX.Element  {
  const users: IUserState = useSelector((state: IStateType) => state.users);

  const userElements: (JSX.Element | null)[] = users.users.map(user => {
    if (!user) { return null; }
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === user.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(user);
      }}
      key={`user_${user.id}`}>
      <th scope="row">{user.id}</th>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {userElements}
        </tbody>
      </table>
    </div>

  );
}

export default ProductList;
