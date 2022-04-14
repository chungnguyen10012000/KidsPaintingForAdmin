import React, { Fragment, Dispatch, useEffect } from "react";
import AccountList from "./AccountList";
import AccountForm from "./AccountForm"
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import {  IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { setModificationState, changeSelectedUser, clearSelectedUser } from "../../store/actions/users/users.action";
import { UserModificationStatus, IUser } from "../../store/models/user.interface";
import { fetchProducts } from "../../store/actions/users/fetchDataUser";
import { useHistory, useParams } from "react-router-dom";

type role = {
  id: string;
};

const Account: React.FC = () => {

  const { id } = useParams<role>()

  let history = useHistory();
  
  const dispatch: Dispatch<any> = useDispatch();
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(clearSelectedUser());
    dispatch(updateCurrentPath("Tài khoản", ""));
  }, [path.area, dispatch]);

  function onUserSelect(user: IUser): void {
    dispatch(changeSelectedUser(user));
    dispatch(setModificationState(UserModificationStatus.None));
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Tài khoản</h1>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Thông tin tài khoản</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <AccountList
                onSelect={onUserSelect}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6 text-center">
              <button  
                className="btn btn-success" 
                onClick={() => 
                  {
                      history.push({
                        pathname: `/${id}/edit-info`,
                      })
                  }}
              >
                Chỉnh thông tin
              </button>
        </div>
        <div className="col-xl-6 col-lg-6 text-center">
              <button  
                className="btn btn-warning"
                onClick={() => 
                  {
                      history.push({
                        pathname: `/${id}/change-password`,
                      })
                  }}
              >
                Thay đổi mật khẩu
              </button>
        </div>
      </div>
    </Fragment >
  );
};

export default Account;
